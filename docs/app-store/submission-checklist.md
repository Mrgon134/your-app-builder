# App Store Submission Checklist

## Code-Side Items I Can Handle

- [x] Paywall fits on mobile without forcing a long scroll.
- [x] Paywall includes plain billing terms.
- [x] Native paywall includes Restore.
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
- [ ] Generate final App Store screenshots after the final build is in TestFlight.
- [ ] Re-run visual checks on a physical iPhone or TestFlight build.

## App Store Connect Items

Manual-only: these cannot be completed safely from this repo because they require App Store Connect UI state, Apple account confirmation, or reviewer-facing credential entry.

- [ ] Upload the successful build.
- [ ] Attach these in-app purchases/subscriptions to version 1.0:
  - `nuju_weekly`
  - `3_month`
  - `lifetime`
- [ ] Create a 7-day introductory free trial for `3_month` if using trial-first positioning.
- [ ] Set App Privacy answers using `privacy-label-draft.md`.
- [ ] Add Support URL: `https://nuju.app/support`
- [ ] Add Privacy Policy URL: `https://nuju.app/privacy`
- [ ] Add marketing URL: `https://nuju.app/`
- [ ] Add screenshots.
- [ ] Add description, subtitle, keywords, category, copyright, and SKU from `metadata-draft.md`.
- [ ] Add demo account credentials in App Review Information. Do not commit the demo password to the repo; paste it directly in App Store Connect.
- [ ] Add an optional existing lifetime demo account for reviewer verification.
- [ ] Paste reviewer notes from `review-notes.md`.
- [ ] Confirm age rating. Recommended: 12+ unless Apple flags a stricter wellness category.
- [ ] Confirm the app is not in Kids Category.

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
