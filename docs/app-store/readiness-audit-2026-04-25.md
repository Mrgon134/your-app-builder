# App Store Readiness Audit - 2026-04-25

This is the current launch-readiness snapshot for Nuju iOS 1.0.

## Code Review Status

Ready enough for first review after final TestFlight checks:

- Native iOS purchases use Apple/RevenueCat for digital access.
- Web checkout is blocked on iOS and routed to the native paywall.
- RevenueCat entitlement is refreshed and persisted to the user profile after purchase or restore.
- Existing web lifetime users can unlock access after logging in on iOS.
- Web checkout no longer trusts client-returned success states before granting paid access.
- Logged-in web checkout now verifies the Supabase session belongs to the submitted user.
- Native paywall includes Restore, Terms, and Privacy links.
- Onboarding and in-app paywalls fit a mobile viewport without long forced scrolling.
- Journal voice and photo media buckets are private, with signed media access.
- AI coach, insight, transcription, weekly summary, and face summary functions require auth and enforce plan gates server-side.
- Public onboarding reveal requests are capped to avoid oversized pre-auth AI payloads.
- Trial reminder email cron is protected from public triggering.
- Account deletion exists in Settings and calls the Supabase `delete_user` RPC.
- Guided programs and habit helper tables now have migrations and user-scoped RLS.
- Public Privacy, Terms, Support, and Medical Disclaimer pages exist.
- iOS permission purpose strings exist for camera, microphone, photo library, and location.
- iOS Privacy Manifest exists in the Xcode target.
- Risky medical/therapy copy has been softened in app-facing and public marketing copy.
- Web-only PWA install prompts are hidden inside the native iOS app.
- Xcode build settings include Team ID `8C775WC62L` and bundle ID `app.nuju.journal`.

## Remaining App Store Connect Items

These still need to be done in App Store Connect before submission:

- Attach IAPs to version 1.0: `nuju_weekly`, `3_month`, and `lifetime`.
- Create the 7-day introductory free trial for `3_month` if trial-first positioning is active.
- Fill App Privacy using `privacy-label-draft.md`.
- Upload screenshots in the required iPhone sizes.
- Add metadata from `metadata-draft.md`.
- Add Review Notes from `review-notes.md`.
- Add demo account credentials in App Review Information, not in the repo.
- Add Support URL, Privacy Policy URL, and Marketing URL.
- Confirm age rating and do not select Kids Category.
- Submit the processed build to App Review.

Note: `codemagic.yaml` currently uploads the IPA but keeps `submit_to_testflight` and `submit_to_app_store` disabled, so final TestFlight/App Review submission is manual from App Store Connect unless that config is changed.

## Screenshot Recommendation

Use five first-submission screenshots. Keep them product-real and emotionally clear.

1. Onboarding result / "Ju Gets You" reveal
   Overlay: "Feel understood in one minute"

2. Guided onboarding check-in
   Overlay: "Start when words feel messy"

3. Journal editor with text and voice options
   Overlay: "Write or speak what is really there"

4. Mood insights or trends
   Overlay: "Notice patterns you usually miss"

5. AI companion or weekly reflection
   Overlay: "Gentle AI reflection, not therapy"

Optional sixth screenshot:

- Settings privacy/account deletion
  Overlay: "Private by default, controlled by you"

Do not show medical claims, crisis advice, fake entries that look like real user data, unavailable trials, or subscription terms that do not match App Store Connect.

## ASO Recommendation

Use this first submission positioning:

- Name: `Nuju: AI Mood Journal`
- Subtitle: `Private emotional reflection`
- Keywords: `tracker,diary,feelings,self care,wellness,voice,mental clarity,gratitude,habits,overthinking`
- Primary category: Lifestyle
- Secondary category: Health & Fitness

Avoid repeating `Nuju`, `AI`, `mood`, and `journal` in the keyword field because the name already covers those terms.

## Review Notes Emphasis

The Review Notes should explicitly say:

- Nuju is not a medical device, therapy service, diagnosis tool, crisis service, or substitute for professional care.
- Subscriptions unlock digital app features only and are handled through Apple IAP on iOS.
- Existing web lifetime users can log in to access their already-owned entitlement.
- The reviewer can use the demo account entered in App Store Connect to test onboarding, journaling, paywall, restore, and account deletion.

## Final TestFlight Pass

Before pressing Submit for Review:

- Fresh install -> onboarding -> final paywall -> close -> free path works.
- Fresh install -> onboarding -> 3-month trial checkout shows Apple terms.
- Purchase sandbox or TestFlight subscription unlocks Pro.
- Force close/reopen keeps Pro access.
- Restore Purchase works after reinstall.
- Lifetime web account login unlocks Pro without requiring a second purchase.
- Insight/coach/transcription gates behave correctly for free, trial, and paid users.
- Delete Account is visible and completes cleanly.
- Permission prompts appear only after user action.
