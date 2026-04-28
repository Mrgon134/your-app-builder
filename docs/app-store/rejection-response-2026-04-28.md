# App Review Response - April 28, 2026

Use this after the corrected build and App Store metadata are ready.

## Resolution Summary

We addressed the issues from submission `aeded185-aa23-4ac3-ae33-1002399b3991`, version `1.0 (5)`, reviewed on iPad Air 11-inch (M3).

- Guideline 2.3.8: Replaced the placeholder iOS app icon with the final Nuju brand icon, and regenerated matching web/PWA icons without text or alpha.
- Guideline 2.1(b): Updated the native iOS paywall so failed product loading is recoverable with a retry action, and verified the app uses RevenueCat/StoreKit for Apple In-App Purchase products.
- Guideline 4: Updated the native iPad paywall presentation so it adapts to the iPad screen instead of rendering as a clipped phone modal.
- Guideline 3.1.2(c): Added the Apple Standard EULA link to the App Store description metadata and kept Privacy, Terms, Restore, and EULA links visible from the native paywall and onboarding paywall.

## Reply To App Review

Hello App Review team,

Thank you for the review. We have resolved the issues identified in the previous submission.

The app icon has been replaced with the final Nuju icon. The iPad paywall layout has been revised for iPad Air 11-inch so it no longer clips or overlaps the screen. The native in-app purchase screen now includes recoverable product loading behavior and visible Restore, Privacy, Terms, and Apple Standard EULA links.

We also updated the App Store metadata to include the Terms of Use (EULA) link:
https://www.apple.com/legal/internet-services/itunes/dev/stdeula/

The app uses Apple In-App Purchase on iOS through RevenueCat for the following products:
- Weekly subscription: `nuju_weekly`
- 3-month subscription: `3_month`
- Lifetime unlock: `lifetime`

Thank you.

## Manual App Store Connect Checks Before Resubmitting

- Confirm the Paid Apps Agreement is active in App Store Connect.
- Confirm the `Nuju Pro` subscription group localization is no longer `REJECTED`.
- Confirm `nuju_weekly`, `3_month`, and `lifetime` are complete, no longer in Developer Action Needed, and attached to the app/version.
- Confirm the RevenueCat current offering includes the same products and packages.
- Confirm the Codemagic `ios_app_store` environment group includes `VITE_REVENUECAT_API_KEY`, `APP_STORE_CONNECT_KEY_IDENTIFIER`, `APP_STORE_CONNECT_ISSUER_ID`, and `APP_STORE_CONNECT_PRIVATE_KEY`.
- Add the EULA link to the App Description or EULA field.
- Upload a new corrected build after the icon change. The build currently attached in App Store Connect is build `6`, uploaded before the final local icon replacement, and still shows the old white-background icon.
- Include a short screen recording if App Review requested it.

## App Store Connect API Check

Checked with App Store Connect API after the rejection:

- App `Nuju`, bundle `app.nuju.journal`, version `1.0` is currently `PREPARE_FOR_SUBMISSION`; the previous review submission `aeded185-aa23-4ac3-ae33-1002399b3991` is `UNRESOLVED_ISSUES`.
- Build `6` is attached and valid, but the build icon asset still shows the older icon. Upload a new build from this repo after the local app icon change.
- Main metadata is present: App Description includes the Apple Standard EULA link, Privacy Policy URL is `https://nuju.app/privacy`, Support URL is `https://nuju.app/support`, Marketing URL is `https://nuju.app/`, iPhone screenshots are complete, and iPad screenshots are complete.
- Age rating is present as `FOUR_PLUS`; the age declaration marks health/wellness topics as true and medical/treatment information as `NONE`.
- Subscription group `22051872` localization `en-US` is `REJECTED`. The API accepted an update to set `customAppName` to `Nuju`, but Apple kept the localization state as `REJECTED`.
- `3_month` subscription state is `DEVELOPER_ACTION_NEEDED`; `en-US` localization is `PREPARE_FOR_SUBMISSION`; review screenshot is complete; prices, availability, and 7-day introductory offers are present.
- `nuju_weekly` subscription state is `DEVELOPER_ACTION_NEEDED`; `en-US` localization is `REJECTED`; review screenshot is complete; prices and availability are present; review note was added through the API.
- `lifetime` non-consumable state is `DEVELOPER_ACTION_NEEDED`; `en-US` localization is `REJECTED`; review screenshot is complete; prices and availability are present; review note was added through the API.
- App Store Connect API rejected product localization edits while the localizations are in `REJECTED` state with `409 ENTITY_ERROR.ATTRIBUTE.INVALID.UNMODIFIABLE`. Product cleanup must happen from App Store Connect's unresolved-issues UI before resubmission.
- Review screenshots were uploaded through App Store Connect API for `3_month`, `nuju_weekly`, and `lifetime`. Each screenshot is `1170x2532`, asset delivery state `COMPLETE`, with no reported errors or warnings.

These product states can prevent StoreKit/RevenueCat from returning purchase packages during App Review, even when the app code is configured correctly.
