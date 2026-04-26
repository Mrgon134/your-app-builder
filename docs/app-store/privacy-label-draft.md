# App Privacy Label Draft

This is a conservative draft for App Store Connect > App Privacy. Review it against the final production build and every enabled SDK before submitting.

## Tracking

Recommended answer for the native iOS app: **No, this app does not use data for tracking across other companies' apps and websites.**

Notes:
- TikTok pixel code is guarded so it does not run in the native app.
- No IDFA/ATT flow is currently used.
- PostHog is used for product analytics, not cross-app advertising tracking.

## Data Linked to the User

### Contact Info

Select:
- Name
- Email Address

Purposes:
- App Functionality
- Account Management
- Customer Support

### User Content

Select:
- Emails or Text Messages / Other User Content, depending on the exact App Store Connect wording available
- Photos or Videos, if users can attach/take photos
- Audio Data, if users can record voice journal entries

Purposes:
- App Functionality
- Personalization

Notes:
- Journal entries, mood reflections, onboarding answers, AI-generated summaries, voice recordings/transcripts, photos/selfies, and prompts are user-provided or generated from user-provided content.

### Sensitive Info

Select if App Store Connect asks for emotional, wellness, or sensitive personal content:
- Sensitive Info

Purposes:
- App Functionality
- Personalization

Notes:
- Nuju is not a medical app, but journal entries may contain emotional or sensitive personal information because users write private reflections.

### Location

Select:
- Precise Location, if journal moments can save latitude/longitude

Purposes:
- App Functionality

Notes:
- Location is optional and only saved when the user chooses a location capture feature.

### Identifiers

Select:
- User ID
- Device ID, if App Store Connect asks and the final SDK stack sends device/app instance identifiers through analytics or purchase SDKs

Purposes:
- App Functionality
- Analytics
- Fraud Prevention / Security, where applicable

Notes:
- Supabase account ID, RevenueCat app user ID, and analytics identifiers may be linked to the user's account or app usage.

### Purchases

Select:
- Purchase History

Purposes:
- App Functionality
- Account Management

Notes:
- Apple and RevenueCat manage subscription/lifetime entitlement status. Nuju does not collect full payment card details.

### Usage Data

Select:
- Product Interaction

Purposes:
- Analytics
- App Functionality

Notes:
- Examples: onboarding step completion, paywall views, plan selections, app screen views, mood selection, feature usage, and trial/upgrade events.

### Diagnostics

Select only if enabled in the final production build:
- Crash Data
- Performance Data

Current recommendation:
- Do not select custom diagnostics unless a crash/performance SDK is added or App Store Connect asks about Apple-provided diagnostics separately.

## Data Not Linked to User

Only use this section for aggregated analytics that cannot be tied back to a user or device. Current implementation sends product analytics with user/app context, so the safer first submission path is to treat relevant analytics data as linked.

## Notes for App Review Accuracy

- Do not under-report optional data. Apple expects the label to cover data that may be collected when a user chooses a feature.
- Keep the Privacy Policy aligned with this label.
- If PostHog, RevenueCat, Supabase, Dodo, AI providers, or any other SDK/service changes, update this draft before submitting an app update.
