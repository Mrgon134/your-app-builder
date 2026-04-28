# App Review Response - April 28, 2026

Use this after the corrected build and App Store metadata are ready.

## Resolution Summary

We addressed the issues from submission `aeded185-aa23-4ac3-ae33-1002399b3991`, version `1.0 (5)`, reviewed on iPad Air 11-inch (M3).

- Guideline 2.3.8: Replaced the placeholder iOS app icon with the final Nuju brand icon.
- Guideline 2.1(b): Updated the native iOS paywall so failed product loading is recoverable with a retry action, and verified the app uses RevenueCat/StoreKit for Apple In-App Purchase products.
- Guideline 4: Updated the native iPad paywall presentation so it adapts to the iPad screen instead of rendering as a clipped phone modal.
- Guideline 3.1.2(c): Added the Apple Standard EULA link to the App Store description metadata and kept Privacy, Terms, Restore, and EULA links visible from the native paywall.

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
- Confirm `nuju_weekly`, `3_month`, and `lifetime` are complete, no longer in Developer Action Needed, and attached to the app/version.
- Confirm the RevenueCat current offering includes the same products and packages.
- Add the EULA link to the App Description or EULA field.
- Upload the corrected build and include a short screen recording if App Review requested it.

## App Store Connect API Check

Checked with App Store Connect API after the rejection:

- App `Nuju`, bundle `app.nuju.journal`, version `1.0` is currently `REJECTED`.
- `nuju_weekly` subscription state is `DEVELOPER_ACTION_NEEDED`; localization state is `REJECTED`.
- `3_month` subscription state is `DEVELOPER_ACTION_NEEDED`; localization state is `REJECTED`.
- `lifetime` non-consumable state is `DEVELOPER_ACTION_NEEDED`; localization state is `REJECTED`.
- App Description metadata now includes the Apple Standard EULA link.
- App Store Connect API rejected product localization edits while the localizations are in `REJECTED` state, so product cleanup must happen in App Store Connect before resubmission.

These product states can prevent StoreKit/RevenueCat from returning purchase packages during App Review, even when the app code is configured correctly.
