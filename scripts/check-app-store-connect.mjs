import crypto from "node:crypto";
import fs from "node:fs";

const API_BASE = "https://api.appstoreconnect.apple.com";
const bundleId = process.env.ASC_BUNDLE_ID || process.env.BUNDLE_ID || "app.nuju.journal";
const targetVersionString = process.env.ASC_VERSION_STRING || "1.0";
const expectedProductIds = (process.env.ASC_EXPECTED_PRODUCTS || "nuju_weekly_v2,nuju_3_month_v2,lifetime")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const keyId = process.env.ASC_KEY_ID || process.env.APP_STORE_CONNECT_KEY_IDENTIFIER;
const issuerId = process.env.ASC_ISSUER_ID || process.env.APP_STORE_CONNECT_ISSUER_ID;
const individualKey = process.env.ASC_INDIVIDUAL_KEY === "1" || process.env.ASC_INDIVIDUAL_KEY === "true";
const privateKeyPath = process.env.ASC_PRIVATE_KEY_PATH || process.env.APP_STORE_CONNECT_PRIVATE_KEY_PATH;
const privateKeyValue = process.env.ASC_PRIVATE_KEY || process.env.APP_STORE_CONNECT_PRIVATE_KEY;
const clockSkewSeconds = Number(process.env.ASC_CLOCK_SKEW_SECONDS || 300);

const blockingStates = new Set(["DEVELOPER_ACTION_NEEDED", "MISSING_METADATA", "REJECTED"]);
const terminalBlockingReviewStates = new Set(["REJECTED", "UNRESOLVED_ISSUES"]);

const base64url = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const loadPrivateKey = () => {
  if (privateKeyPath) {
    return fs.readFileSync(privateKeyPath, "utf8");
  }

  if (privateKeyValue) {
    return privateKeyValue.replace(/\\n/g, "\n");
  }

  return "";
};

const createToken = () => {
  if (!keyId) {
    throw new Error("Missing ASC_KEY_ID or APP_STORE_CONNECT_KEY_IDENTIFIER.");
  }

  if (!issuerId && !individualKey) {
    throw new Error("Missing ASC_ISSUER_ID or APP_STORE_CONNECT_ISSUER_ID. For an individual key, set ASC_INDIVIDUAL_KEY=1.");
  }

  const privateKey = loadPrivateKey();
  if (!privateKey.includes("BEGIN PRIVATE KEY")) {
    throw new Error("Missing .p8 private key contents. Set ASC_PRIVATE_KEY_PATH or APP_STORE_CONNECT_PRIVATE_KEY.");
  }

  // Apple rejects tokens whose iat is a little ahead of their server clock.
  // Backdate slightly so local clock skew does not produce false 401s.
  const now = Math.floor(Date.now() / 1000) - clockSkewSeconds;
  const header = { alg: "ES256", kid: keyId, typ: "JWT" };
  const payload = {
    ...(individualKey ? { sub: "user" } : { iss: issuerId }),
    iat: now,
    exp: now + 900,
    aud: "appstoreconnect-v1",
  };

  const body = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signature = crypto
    .sign("sha256", Buffer.from(body), {
      key: privateKey,
      dsaEncoding: "ieee-p1363",
    })
    .toString("base64url");
  return `${body}.${signature}`;
};

const token = createToken();

const request = async (path) => {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = body.errors
      ?.map((error) => `${error.code || response.status}: ${error.title || ""} ${error.detail || ""}`.trim())
      .join("\n");
    throw new Error(detail || `App Store Connect request failed: ${response.status}`);
  }

  return body;
};

const requestOptional = async (path) => {
  try {
    return await request(path);
  } catch (error) {
    return { data: null, error };
  }
};

const collectPaginated = async (initialPath) => {
  const items = [];
  let path = initialPath;

  while (path) {
    const page = await request(path);
    items.push(...(page.data || []));
    path = page.links?.next || "";
  }

  return items;
};

const countPaginated = async (initialPath) => {
  const page = await requestOptional(initialPath);
  if (page.error) return null;
  if (page.meta?.paging?.total != null) return page.meta.paging.total;
  return Array.isArray(page.data) ? page.data.length : page.data ? 1 : 0;
};

const yesNo = (value) => (value ? "yes" : "no");
const presentMissing = (value) => (value ? "present" : "missing");
const stateOf = (resource) => resource?.attributes?.state || resource?.attributes?.appStoreState || resource?.attributes?.appVersionState || "UNKNOWN";
const isCompleteAsset = (resource) => resource?.attributes?.assetDeliveryState?.state === "COMPLETE";
const isBlockingState = (state) => blockingStates.has(state || "");
const summarizeStates = (resources) =>
  resources.length
    ? resources.map((item) => `${item.attributes?.locale || item.attributes?.name || item.id}:${stateOf(item)}`).join(", ")
    : "none";

const output = [];
const blockers = [];
const warnings = [];

const log = (line = "") => output.push(line);
const block = (message) => blockers.push(message);
const warn = (message) => warnings.push(message);

const checkProductState = (productId, label, state) => {
  if (expectedProductIds.includes(productId) && isBlockingState(state)) {
    block(`${productId}: ${label} state=${state}`);
  }
};

const readScreenshotSummary = async (set) => {
  const screenshots = await collectPaginated(`/v1/appScreenshotSets/${set.id}/appScreenshots?limit=200`);
  const incomplete = screenshots.filter((shot) => !isCompleteAsset(shot));
  return {
    type: set.attributes?.screenshotDisplayType || "UNKNOWN",
    count: screenshots.length,
    incomplete: incomplete.length,
  };
};

const auditVersionLocalization = async (versionLocalization) => {
  const attrs = versionLocalization.attributes || {};
  const description = attrs.description || "";
  const hasEula = description.includes("apple.com/legal/internet-services/itunes/dev/stdeula");
  const hasPrivacy = description.includes("https://nuju.app/privacy");

  log(
    `VERSION_LOCALIZATION ${attrs.locale || "unknown"} eula=${yesNo(hasEula)} privacyInDescription=${yesNo(hasPrivacy)} support=${attrs.supportUrl || "missing"} marketing=${attrs.marketingUrl || "missing"} keywordsLen=${(attrs.keywords || "").length}`,
  );

  if (!hasEula) warn(`Version localization ${attrs.locale || versionLocalization.id}: App Description does not contain the Apple Standard EULA link.`);
  if (!attrs.supportUrl) warn(`Version localization ${attrs.locale || versionLocalization.id}: Support URL is missing.`);
  if (!description) warn(`Version localization ${attrs.locale || versionLocalization.id}: description is missing.`);

  const screenshotSets = await collectPaginated(`/v1/appStoreVersionLocalizations/${versionLocalization.id}/appScreenshotSets?limit=50`);
  const screenshotSummaries = [];
  for (const set of screenshotSets) {
    screenshotSummaries.push(await readScreenshotSummary(set));
  }

  const hasIphoneSet = screenshotSummaries.some((item) => item.type.startsWith("APP_IPHONE") && item.count > 0);
  const hasIpadSet = screenshotSummaries.some((item) => item.type.startsWith("APP_IPAD") && item.count > 0);

  log(
    `SCREENSHOT_SETS ${attrs.locale || "unknown"} count=${screenshotSummaries.length} types=${screenshotSummaries
      .map((item) => `${item.type}:${item.count}${item.incomplete ? `(${item.incomplete} incomplete)` : ""}`)
      .join(", ") || "none"}`,
  );

  if (!hasIphoneSet) warn(`Version localization ${attrs.locale || versionLocalization.id}: iPhone screenshot set is missing.`);
  if (!hasIpadSet) warn(`Version localization ${attrs.locale || versionLocalization.id}: iPad screenshot set is missing.`);
  for (const summary of screenshotSummaries) {
    if (summary.incomplete) warn(`${summary.type}: ${summary.incomplete} screenshot upload(s) are incomplete.`);
  }
};

const auditSubscription = async (subscription) => {
  const attrs = subscription.attributes || {};
  const productId = attrs.productId || subscription.id;
  const localizations = await collectPaginated(`/v1/subscriptions/${subscription.id}/subscriptionLocalizations?limit=200`);
  const screenshot = await requestOptional(`/v1/subscriptions/${subscription.id}/appStoreReviewScreenshot`);
  const availability = await requestOptional(`/v1/subscriptions/${subscription.id}/subscriptionAvailability`);
  const territoryCount = availability.data
    ? await countPaginated(`/v1/subscriptionAvailabilities/${availability.data.id}/availableTerritories?limit=1`)
    : null;
  const priceCount = await countPaginated(`/v1/subscriptions/${subscription.id}/prices?limit=1`);
  const introCount = await countPaginated(`/v1/subscriptions/${subscription.id}/introductoryOffers?limit=1`);
  const screenshotComplete = isCompleteAsset(screenshot.data);

  log(
    `SUB ${productId} state=${attrs.state || "UNKNOWN"} period=${attrs.subscriptionPeriod || "unknown"} reviewNote=${yesNo(attrs.reviewNote)} loc=${summarizeStates(localizations)} screenshot=${screenshotComplete ? "complete" : "missing/incomplete"} prices=${priceCount ?? "unknown"} territories=${territoryCount ?? "unknown"} introOffers=${introCount ?? "unknown"}`,
  );

  checkProductState(productId, "subscription", attrs.state);
  if (expectedProductIds.includes(productId) && !attrs.reviewNote) warn(`${productId}: review note is missing.`);
  if (expectedProductIds.includes(productId) && !screenshotComplete) block(`${productId}: App Review screenshot is missing or incomplete.`);
  if (expectedProductIds.includes(productId) && !priceCount) block(`${productId}: no subscription prices returned.`);
  if (expectedProductIds.includes(productId) && !territoryCount) block(`${productId}: subscription availability has no territories.`);

  for (const localization of localizations) {
    const state = stateOf(localization);
    if (expectedProductIds.includes(productId) && isBlockingState(state)) {
      block(`${productId}: localization ${localization.attributes?.locale || localization.id} state=${state}`);
    }
  }
};

const auditInAppPurchase = async (inAppPurchase) => {
  const attrs = inAppPurchase.attributes || {};
  const productId = attrs.productId || inAppPurchase.id;
  const localizations = await collectPaginated(`/v2/inAppPurchases/${inAppPurchase.id}/inAppPurchaseLocalizations?limit=200`);
  const screenshot = await requestOptional(`/v2/inAppPurchases/${inAppPurchase.id}/appStoreReviewScreenshot`);
  const availability = await requestOptional(`/v2/inAppPurchases/${inAppPurchase.id}/inAppPurchaseAvailability`);
  const territoryCount = availability.data
    ? await countPaginated(`/v1/inAppPurchaseAvailabilities/${availability.data.id}/availableTerritories?limit=1`)
    : null;
  const priceSchedule = await requestOptional(`/v2/inAppPurchases/${inAppPurchase.id}/iapPriceSchedule`);
  const manualPriceCount = priceSchedule.data
    ? await countPaginated(`/v1/inAppPurchasePriceSchedules/${priceSchedule.data.id}/manualPrices?limit=1`)
    : null;
  const automaticPriceCount = priceSchedule.data
    ? await countPaginated(`/v1/inAppPurchasePriceSchedules/${priceSchedule.data.id}/automaticPrices?limit=1`)
    : null;
  const screenshotComplete = isCompleteAsset(screenshot.data);

  log(
    `IAP ${productId} state=${attrs.state || "UNKNOWN"} type=${attrs.inAppPurchaseType || "unknown"} reviewNote=${yesNo(attrs.reviewNote)} loc=${summarizeStates(localizations)} screenshot=${screenshotComplete ? "complete" : "missing/incomplete"} manualPrices=${manualPriceCount ?? "unknown"} autoPrices=${automaticPriceCount ?? "unknown"} territories=${territoryCount ?? "unknown"}`,
  );

  checkProductState(productId, "in-app purchase", attrs.state);
  if (expectedProductIds.includes(productId) && !attrs.reviewNote) warn(`${productId}: review note is missing.`);
  if (expectedProductIds.includes(productId) && !screenshotComplete) block(`${productId}: App Review screenshot is missing or incomplete.`);
  if (expectedProductIds.includes(productId) && !manualPriceCount && !automaticPriceCount) block(`${productId}: no IAP prices returned.`);
  if (expectedProductIds.includes(productId) && !territoryCount) block(`${productId}: IAP availability has no territories.`);

  for (const localization of localizations) {
    const state = stateOf(localization);
    if (expectedProductIds.includes(productId) && isBlockingState(state)) {
      block(`${productId}: localization ${localization.attributes?.locale || localization.id} state=${state}`);
    }
  }
};

const main = async () => {
  log(`Checking App Store Connect for bundle ${bundleId}`);

  const apps = await collectPaginated(`/v1/apps?filter[bundleId]=${encodeURIComponent(bundleId)}&limit=1`);
  const app = apps[0];

  if (!app) {
    throw new Error(`No App Store Connect app found for bundle ${bundleId}.`);
  }

  const appAttrs = app.attributes || {};
  log(`APP ${appAttrs.name || "(unnamed)"} id=${app.id} bundle=${appAttrs.bundleId || "unknown"}`);
  log(
    `APP_FLAGS kids=${yesNo(appAttrs.isOrEverWasMadeForKids)} contentRights=${appAttrs.contentRightsDeclaration || "unknown"} s2s=${appAttrs.subscriptionStatusUrlVersion || "missing"}/${appAttrs.subscriptionStatusUrlVersionForSandbox || "missing"} streamlinedPurchasing=${yesNo(appAttrs.streamlinedPurchasingEnabled)}`,
  );

  if (appAttrs.isOrEverWasMadeForKids) block("App is marked Made for Kids.");
  if (!appAttrs.subscriptionStatusUrl || !appAttrs.subscriptionStatusUrlForSandbox) {
    warn("Apple subscription server notification URLs are missing.");
  }

  const appInfos = await collectPaginated(`/v1/apps/${app.id}/appInfos?limit=10`);
  const appInfo = appInfos[0];
  if (appInfo) {
    const infoAttrs = appInfo.attributes || {};
    log(
      `APP_INFO state=${stateOf(appInfo)} appStoreAgeRating=${infoAttrs.appStoreAgeRating || "missing"} brazilAgeRating=${infoAttrs.brazilAgeRating || infoAttrs.brazilAgeRatingV2 || "missing"}`,
    );

    const ageDeclaration = await requestOptional(`/v1/appInfos/${appInfo.id}/ageRatingDeclaration`);
    if (ageDeclaration.data) {
      const ageAttrs = ageDeclaration.data.attributes || {};
      log(
        `AGE_RATING_DECL healthOrWellness=${yesNo(ageAttrs.healthOrWellnessTopics)} medicalOrTreatment=${ageAttrs.medicalOrTreatmentInformation || "unknown"} unrestrictedWeb=${yesNo(ageAttrs.unrestrictedWebAccess)} userGeneratedContent=${yesNo(ageAttrs.userGeneratedContent)}`,
      );
    } else {
      warn("Age rating declaration could not be read.");
    }

    const infoLocalizations = await collectPaginated(`/v1/appInfos/${appInfo.id}/appInfoLocalizations?limit=200`);
    for (const localization of infoLocalizations) {
      const attrs = localization.attributes || {};
      log(
        `APP_INFO_LOCALIZATION ${attrs.locale || "unknown"} name=${attrs.name || "missing"} subtitle=${attrs.subtitle || "missing"} privacy=${attrs.privacyPolicyUrl || "missing"}`,
      );
      if (!attrs.privacyPolicyUrl) block(`App info localization ${attrs.locale || localization.id}: privacy policy URL is missing.`);
    }

    const primaryCategory = await requestOptional(`/v1/appInfos/${appInfo.id}/primaryCategory`);
    const secondaryCategory = await requestOptional(`/v1/appInfos/${appInfo.id}/secondaryCategory`);
    log(
      `CATEGORY primary=${primaryCategory.data?.id || "missing"} secondary=${secondaryCategory.data?.id || "missing"}`,
    );
  } else {
    warn("No appInfo resource returned.");
  }

  const versions = await collectPaginated(`/v1/apps/${app.id}/appStoreVersions?limit=20`);
  const version =
    versions.find((item) => item.attributes?.platform === "IOS" && item.attributes?.versionString === targetVersionString) ||
    versions.find((item) => item.attributes?.platform === "IOS") ||
    versions[0];

  if (!version) {
    throw new Error("No App Store version returned.");
  }

  const versionAttrs = version.attributes || {};
  log(
    `VERSION ${versionAttrs.versionString || "unknown"} id=${version.id} state=${versionAttrs.appStoreState || versionAttrs.appVersionState || "UNKNOWN"} release=${versionAttrs.releaseType || "unknown"} usesIdfa=${yesNo(versionAttrs.usesIdfa)}`,
  );

  const build = await requestOptional(`/v1/appStoreVersions/${version.id}/build`);
  if (build.data) {
    const attrs = build.data.attributes || {};
    const icon = attrs.iconAssetToken || {};
    log(
      `BUILD id=${build.data.id} version=${attrs.version || "unknown"} uploaded=${attrs.uploadedDate || "unknown"} processing=${attrs.processingState || "unknown"} expired=${yesNo(attrs.expired)} minOs=${attrs.minOsVersion || "unknown"} icon=${icon.width || "?"}x${icon.height || "?"}`,
    );
    if (attrs.processingState !== "VALID") block(`Build ${attrs.version || build.data.id}: processing state=${attrs.processingState || "UNKNOWN"}.`);
    if (attrs.expired) block(`Build ${attrs.version || build.data.id}: build is expired.`);
  } else {
    block("No build is attached to the selected App Store version.");
  }

  const reviewDetail = await requestOptional(`/v1/appStoreVersions/${version.id}/appStoreReviewDetail`);
  if (reviewDetail.data) {
    const attrs = reviewDetail.data.attributes || {};
    log(
      `REVIEW_DETAIL demoRequired=${yesNo(attrs.demoAccountRequired)} demoAccount=${yesNo(attrs.demoAccountName)} demoPassword=${yesNo(attrs.demoAccountPassword)} notes=${yesNo(attrs.notes)} contact=${yesNo(attrs.contactFirstName && attrs.contactLastName && attrs.contactEmail && attrs.contactPhone)}`,
    );
    if (attrs.demoAccountRequired && (!attrs.demoAccountName || !attrs.demoAccountPassword)) {
      block("App Review demo account is required but username or password is missing.");
    }
    if (!attrs.notes) warn("App Review notes are missing.");
  } else {
    warn("App Review detail could not be read.");
  }

  const versionLocalizations = await collectPaginated(`/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations?limit=200`);
  for (const localization of versionLocalizations) {
    await auditVersionLocalization(localization);
  }

  const eula = await requestOptional(`/v1/apps/${app.id}/endUserLicenseAgreement`);
  log(`CUSTOM_EULA ${presentMissing(eula.data)}`);

  const reviewSubmissions = await collectPaginated(`/v1/apps/${app.id}/reviewSubmissions?limit=20`);
  for (const submission of reviewSubmissions) {
    const attrs = submission.attributes || {};
    const items = await collectPaginated(`/v1/reviewSubmissions/${submission.id}/items?limit=200`);
    log(
      `REVIEW_SUBMISSION ${submission.id} state=${attrs.state || "unknown"} submitted=${attrs.submittedDate || "unknown"} items=${items.length}:${items
        .map((item) => item.attributes?.state || "UNKNOWN")
        .join(",") || "none"}`,
    );
    if (terminalBlockingReviewStates.has(attrs.state || "")) {
      warn(`Review submission ${submission.id} is still ${attrs.state}. Resolve the rejected submission or create a fresh submission after fixes.`);
    }
  }

  const subscriptionGroups = await collectPaginated(`/v1/apps/${app.id}/subscriptionGroups?limit=200`);
  const subscriptions = [];
  for (const group of subscriptionGroups) {
    const groupLocalizations = await collectPaginated(`/v1/subscriptionGroups/${group.id}/subscriptionGroupLocalizations?limit=200`);
    log(`SUB_GROUP ${group.id} loc=${summarizeStates(groupLocalizations)}`);
    for (const localization of groupLocalizations) {
      const state = stateOf(localization);
      if (isBlockingState(state)) block(`subscription group ${group.id}: localization ${localization.attributes?.locale || localization.id} state=${state}`);
    }

    const groupSubscriptions = await collectPaginated(`/v1/subscriptionGroups/${group.id}/subscriptions?limit=200`);
    subscriptions.push(...groupSubscriptions);
  }

  const inAppPurchases = await collectPaginated(`/v1/apps/${app.id}/inAppPurchasesV2?limit=200`).catch((error) => {
    warn(`Could not read in-app purchases: ${error.message}`);
    return [];
  });

  for (const subscription of subscriptions) {
    await auditSubscription(subscription);
  }

  for (const inAppPurchase of inAppPurchases) {
    await auditInAppPurchase(inAppPurchase);
  }

  const foundIds = new Set([...subscriptions, ...inAppPurchases].map((product) => product.attributes?.productId).filter(Boolean));
  const missing = expectedProductIds.filter((productId) => !foundIds.has(productId));
  for (const productId of missing) {
    block(`${productId}: expected product is missing from App Store Connect.`);
  }

  for (const line of output) {
    console.log(line);
  }

  if (warnings.length) {
    console.warn("\nWarnings:");
    for (const issue of warnings) {
      console.warn(`- ${issue}`);
    }
  }

  if (blockers.length) {
    console.error("\nBlocking issues:");
    for (const issue of blockers) {
      console.error(`- ${issue}`);
    }
    process.exit(2);
  }

  console.log("\nNo obvious App Store Connect blockers were found.");
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
