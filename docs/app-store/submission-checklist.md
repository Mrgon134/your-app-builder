# App Store Submission Checklist

## Code-Side Items I Can Handle

- [x] Paywall fits on mobile without forcing a long scroll.
- [x] Paywall includes plain billing terms.
- [x] Native paywall includes Restore.
- [x] Native paywall includes Privacy, Terms, and Apple Standard EULA links.
- [x] Native paywall checks RevenueCat intro-trial eligibility before showing trial CTA.
- [x] Trial copy is gated by config and StoreKit/RevenueCat state.
- [x] Public legal pages exist: Privacy, Terms, Medical Disclaimer, Support.
- [x] Terms updated to mention iOS and web.
- [x] Medical Disclaimer encoding cleaned up.
- [x] Existing web lifetime users can unlock access after login.
- [x] Server-side AI routes require auth and enforce free/trial/paid access.
- [x] Checkout status cannot grant access from untrusted client status.
- [x] Logged-in web checkout verifies the auth token belongs to the user.
- [x] Journal voice/photo media uses private buckets and signed URLs.
- [x] Trial reminder cron requires service-role or cron secret auth.
- [x] Xcode project includes Team ID `8C775WC62L` for bundle `app.nuju.journal`.
- [x] Risky therapy/diagnosis/treatment copy softened for first review.
- [x] Web-only PWA install prompt hidden inside native iOS.
- [x] App Store metadata and ASO draft prepared.
- [x] Screenshot shot list prepared.
- [x] Readiness audit prepared: `readiness-audit-2026-04-25.md`.
- [x] Codemagic iOS workflow now fails early if RevenueCat/App Store Connect release environment variables are missing.
- [x] App and web icons regenerated as final no-text brand icons with no alpha channel.
- [x] Added a fuller App Store Connect audit script for version metadata, screenshots, build, age rating, subscriptions, and IAPs.
- [ ] Generate final App Store screenshots after the final build is in TestFlight.
- [ ] Re-run visual checks on a physical iPhone or TestFlight build.

## App Store Connect Items

Manual-only: these cannot be completed safely from this repo because they require App Store Connect UI state, Apple account confirmation, or reviewer-facing credential entry.

- [ ] Upload a new successful build after the local icon replacement. The currently attached App Store Connect build `6` still shows the older white-background icon.
- [ ] Add `VITE_REVENUECAT_API_KEY` to the Codemagic `ios_app_store` environment group. It should be the RevenueCat public Apple SDK key, usually starting with `appl_`.
- [ ] Add `APP_STORE_CONNECT_KEY_IDENTIFIER`, `APP_STORE_CONNECT_ISSUER_ID`, and `APP_STORE_CONNECT_PRIVATE_KEY` to the Codemagic `ios_app_store` environment group.
- [ ] Attach these in-app purchases/subscriptions to version 1.0:
  - `nuju_weekly`
  - `3_month`
  - `lifetime`
- [ ] Resolve the rejected `Nuju Pro` subscription group localization. Live API check on April 28, 2026 showed subscription group `22051872` localization `en-US` is `REJECTED`; API accepted `customAppName=Nuju` but did not clear the rejected state.
- [ ] Resolve App Store Connect product states. Live API check on April 28, 2026 showed all three products are `DEVELOPER_ACTION_NEEDED`. `nuju_weekly` and `lifetime` have rejected `en-US` localizations that App Store Connect API cannot edit in their current state.
- [x] Add a review note to `nuju_weekly`.
- [x] Create a 7-day introductory free trial for `3_month` if using trial-first positioning.
- [ ] Set App Privacy answers using `privacy-label-draft.md`. App Store Connect API does not expose the full privacy questionnaire for this audit, so confirm it in the UI.
- [x] Add Support URL: `https://nuju.app/support`
- [x] Add Privacy Policy URL: `https://nuju.app/privacy`
- [x] Add marketing URL: `https://nuju.app/`
- [x] Add screenshots for iPhone and iPad.
- [x] Add description, subtitle, keywords, category, copyright, and SKU from `metadata-draft.md`.
- [x] Add the Apple Standard EULA link to the App Description or EULA field.
- [x] Add demo account credentials in App Review Information. Do not commit the demo password to the repo; paste it directly in App Store Connect.
- [ ] Add an optional existing lifetime demo account for reviewer verification.
- [ ] Paste reviewer notes from `review-notes.md`.
- [x] Confirm age rating. Live API check reports `FOUR_PLUS`, with health/wellness topics enabled and medical/treatment information set to `NONE`.
- [x] Confirm the app is not in Kids Category.

## Final Review Before Submit

- [ ] Open TestFlight build and complete onboarding from fresh install.
- [ ] Verify 3-month plan shows correct Apple price and intro trial only when active and eligible.
- [ ] Verify Restore Purchase button does not hang.
- [ ] Verify "Maybe later, continue free" path works.
- [ ] Verify Privacy, Terms, Support, and Medical Disclaimer open from the app.
- [ ] Verify account deletion is visible in settings and works in production or is clearly available.
- [ ] Verify camera/microphone/photo/location permission prompts only appear after user action.
- [ ] Verify no copy claims therapy, treatment, diagnosis, or guaranteed mental health outcomes.
- [ ] Rotate any tokens that were pasted into chats or build logs after the first successful submission.

## Optional App Store Connect API Check

After setting the issuer ID locally, run:

```powershell
$env:APP_STORE_CONNECT_KEY_IDENTIFIER="VRQYQ5J46T"
$env:APP_STORE_CONNECT_ISSUER_ID="REPLACE_WITH_ISSUER_ID"
$env:APP_STORE_CONNECT_PRIVATE_KEY_PATH="C:\Users\irfan\Downloads\AuthKey_VRQYQ5J46T.p8"
node scripts/check-app-store-connect.mjs
```

If this reports missing products or `DEVELOPER_ACTION_NEEDED`, fix those product states in App Store Connect before resubmitting.
