const requiredVariables = [
  ["VITE_SUPABASE_URL", "Supabase project URL"],
  ["VITE_SUPABASE_PUBLISHABLE_KEY", "Supabase publishable key"],
  ["VITE_REVENUECAT_API_KEY", "RevenueCat public Apple SDK key"],
  ["APP_STORE_CONNECT_KEY_IDENTIFIER", "App Store Connect API key ID"],
  ["APP_STORE_CONNECT_ISSUER_ID", "App Store Connect issuer ID"],
  ["APP_STORE_CONNECT_PRIVATE_KEY", "App Store Connect private key"],
];

const missing = requiredVariables.filter(([name]) => !process.env[name]?.trim());
const invalid = [];

const revenueCatKey = process.env.VITE_REVENUECAT_API_KEY?.trim();
if (revenueCatKey && !revenueCatKey.startsWith("appl_")) {
  invalid.push("VITE_REVENUECAT_API_KEY should be the RevenueCat public Apple SDK key and usually starts with appl_.");
}

const appStoreKeyId = process.env.APP_STORE_CONNECT_KEY_IDENTIFIER?.trim();
if (appStoreKeyId && !/^[A-Z0-9]{10}$/.test(appStoreKeyId)) {
  invalid.push("APP_STORE_CONNECT_KEY_IDENTIFIER should be the 10-character App Store Connect key ID.");
}

const appStorePrivateKey = process.env.APP_STORE_CONNECT_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";
if (appStorePrivateKey && !appStorePrivateKey.includes("BEGIN PRIVATE KEY")) {
  invalid.push("APP_STORE_CONNECT_PRIVATE_KEY must contain the .p8 private key contents, not just the filename.");
}

if (missing.length || invalid.length) {
  console.error("iOS release environment is incomplete. This build could fail App Review purchase loading.");

  if (missing.length) {
    console.error("\nMissing variables:");
    for (const [name, description] of missing) {
      console.error(`- ${name}: ${description}`);
    }
  }

  if (invalid.length) {
    console.error("\nInvalid variables:");
    for (const message of invalid) {
      console.error(`- ${message}`);
    }
  }

  console.error("\nFix these in the Codemagic ios_app_store environment group before building for App Store review.");
  process.exit(1);
}

console.log("iOS release environment looks ready.");
