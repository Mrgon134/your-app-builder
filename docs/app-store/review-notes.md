# App Review Notes

Paste this into App Store Connect > App Review Information > Notes.

## Reviewer Notes

Nuju is an AI journaling and mood reflection app. It helps users write journal entries, track mood patterns, and receive supportive AI-generated reflections from an in-app companion named Ju.

Nuju is not a medical device, therapy service, crisis intervention service, diagnosis tool, or substitute for professional mental health care. The app includes a Medical Disclaimer page in the public navigation and in app settings.

## How to Review the Core Flow

1. Open the app.
2. Start the onboarding flow from the landing screen.
3. Answer the guided emotional reflection questions.
4. Enter a name and email when prompted.
5. Continue through the generated "Ju Gets You" reveal.
6. The final onboarding step shows the subscription paywall.
7. The onboarding paywall includes clear billing terms and a free path. Selecting a paid plan on iOS opens the Apple-managed purchase screen, which includes Restore Purchase.

## Purchases

The app uses Apple In-App Purchase for iOS subscriptions and lifetime unlocks through RevenueCat.

Products:
- Weekly subscription: `nuju_weekly`
- 3-month subscription: `3_month`
- Lifetime non-consumable: `lifetime`

The 3-month plan should only advertise a 7-day free trial when the App Store Connect introductory offer is configured and the user is eligible. Otherwise, the app shows the normal 3-month billing terms.

The native iOS paywall includes product title, subscription duration, localized Apple price, Restore Purchase, Privacy, Terms, and the Apple Standard EULA link.

Existing users who previously purchased lifetime access on Nuju's web/PWA version can sign in with the same account and access their existing entitlement in the iOS app. The iOS app does not direct users to purchase digital access outside the app and uses Apple In-App Purchase for new iOS purchases.

This cross-platform access is intended to align with App Store Review Guideline 3.1.3(b) for multiplatform services: users can access features acquired on Nuju's web/PWA version, while the same premium access is also available through Apple In-App Purchase in the iOS app.

## Demo Account

Use the demo user you prepared for App Review and replace this placeholder directly in App Store Connect:

- Email: `REPLACE_WITH_DEMO_EMAIL`
- Password: `REPLACE_WITH_DEMO_PASSWORD`

Suggested demo setup:
- Account has completed onboarding.
- Account has a few sample journal entries.
- Account is not subscribed, so the reviewer can see the paywall.
- Optional second demo account: an existing web lifetime user, so the reviewer can verify that login restores pre-existing access without an external purchase link.

Security note: keep the real demo password out of the repository. Paste it only into App Store Connect > App Review Information.

## Safety and Privacy

Nuju stores journal data under the user's account and does not sell personal journal content. Optional camera, microphone, photo, and location permissions are requested only when the user chooses a feature that needs them.

If the reviewer wants to verify legal pages:
- Privacy Policy: `https://nuju.app/privacy`
- Terms of Service: `https://nuju.app/terms`
- Medical Disclaimer: `https://nuju.app/medical-disclaimer`
- Support: `https://nuju.app/support`
