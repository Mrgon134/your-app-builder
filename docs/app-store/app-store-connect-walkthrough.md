# App Store Connect Walkthrough

Use this for the first Nuju iOS submission.

## 1. Create the 7-Day Intro Offer for `nuju_3_month_v2`

1. Open App Store Connect.
2. Go to Apps > Nuju.
3. In the sidebar, open Monetization > Subscriptions.
4. Open the subscription group that contains `nuju_3_month_v2`.
5. Click the `nuju_3_month_v2` subscription.
6. In Subscription Prices, click View all Subscription Pricing.
7. Click Set up Introductory Offer.
8. Select all countries or the countries where Nuju will launch.
9. Set start date to today.
10. Set an end date or no end date if App Store Connect offers that option.
11. Choose Free.
12. Choose 1 Week.
13. Confirm.

If the app copy should mention the free trial before Apple checkout, make sure the next iOS build is made with:

```txt
VITE_THREE_MONTH_INTRO_TRIAL_ENABLED=true
VITE_THREE_MONTH_TRIAL_DAYS=7
```

## 2. Attach IAPs to Version 1.0

1. Go to Apps > Nuju.
2. Open the iOS version 1.0 page in the sidebar.
3. Scroll to In-App Purchases and Subscriptions.
4. Click Select In-App Purchases or Subscriptions, or Edit if already started.
5. Select:
   - `nuju_weekly_v2`
   - `nuju_3_month_v2`
   - `lifetime`
6. Click Done.

If an item is missing, open Monetization > Subscriptions or Monetization > In-App Purchases and complete missing metadata until it is Ready to Submit.

## 3. Resolve Rejected Product Metadata

Use this when the App Review page shows the submission as `Unresolved Issues`.

1. Go to Apps > Nuju > App Review.
2. Open the unresolved iOS submission.
3. Click `Edit` for the rejected `iOS App 1.0` item.
4. In the version edit view, scroll to In-App Purchases and Subscriptions.
5. Open and confirm the rejected product metadata:
   - Subscription group `Nuju Pro`
   - Weekly subscription `nuju_weekly_v2`
   - Lifetime non-consumable `lifetime`
6. Save each item so the rejected localization is re-added for review.
7. Confirm all three products are attached to version 1.0:
   - `nuju_weekly_v2`
   - `nuju_3_month_v2`
   - `lifetime`
8. Click `Add for Review`, then return to the unresolved submission and click `Resubmit to App Review`.

Apple currently locks rejected legacy subscription localizations from the App Store Connect API. Use the replacement subscriptions above when attaching products to the app version.

## 4. Fill App Privacy

1. Go to Apps > Nuju > App Privacy.
2. Add Privacy Policy URL: `https://nuju.app/privacy`.
3. Choose that the app collects data.
4. Use `privacy-label-draft.md` as the source of truth.
5. Set Tracking to No.
6. Publish the privacy responses.

## 5. Upload Screenshots

1. Open Apps > Nuju > iOS version 1.0.
2. In iOS Previews and Screenshots, upload iPhone screenshots.
3. Start with 6.9-inch portrait screenshots if available.
4. Upload 5 screenshots from `screenshots-shot-list.md`.
5. Do not show trial copy unless the 7-day intro offer is active.

## 6. Add Demo Account and Review Notes

1. Open Apps > Nuju > iOS version 1.0.
2. Scroll to App Review Information.
3. Turn on Sign-in required.
4. Enter the demo username and password directly in App Store Connect.
5. Paste the text from `review-notes.md` into Notes.
6. Do not store the demo password in this repository.

## 7. Submit the Build

1. On iOS version 1.0, scroll to Build.
2. Select the processed Codemagic build.
3. Confirm App Privacy, screenshots, metadata, build, age rating, IAP attachments, and review info are complete.
4. Click Add for Review.
5. Open the Draft Submission.
6. Click Submit for Review.

If App Store Connect asks export compliance questions, answer based on the final build. For this app, the expected path is standard HTTPS encryption only and no custom cryptography.
