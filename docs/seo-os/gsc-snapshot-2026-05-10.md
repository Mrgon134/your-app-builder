# GSC Snapshot — 2026-05-10

Window: 2026-04-06 → 2026-05-10 (35 days).

This snapshot freezes the Google Search Console state so the next sprint can react to specific pages and queries instead of vibes. Numbers below are pasted from GSC as-is.

## Headline

- Site total: 43 clicks, 975 impressions, ~4.4% CTR, avg position ~13.
- Mobile is doing almost all the converting (18.12% CTR vs Desktop 1.61%).
- The homepage carries the funnel. Recommendation blog pages collect impressions but bleed CTR.
- New commercial landing pages (`/ai-journal`, `/mood-tracker`, `/voice-journaling`) already rank on page 1 but are not yet clicked.

## Daily trend

| Date | Clicks | Impressions | Position |
| --- | --- | --- | --- |
| 2026-04-06 | 0 | 2 | 1.50 |
| 2026-04-13 | 1 | 10 | 15.90 |
| 2026-04-19 | 1 | 9 | 15.80 |
| 2026-04-21 | 4 | 28 | 19.90 |
| 2026-04-22 | 2 | 40 | 15.00 |
| 2026-04-26 | 2 | 47 | 11.80 |
| 2026-04-29 | 2 | 47 | 12.00 |
| 2026-04-30 | 3 | 53 | 18.10 |
| 2026-05-01 | 5 | 91 | 20.10 |
| 2026-05-02 | 4 | 62 | 13.80 |
| 2026-05-03 | 2 | 38 | 5.20 |
| 2026-05-04 | 3 | 53 | 8.30 |
| 2026-05-06 | 3 | 58 | 9.20 |
| 2026-05-09 | 2 | 61 | 11.80 |
| 2026-05-10 | 2 | 73 | 11.60 |

Impressions trend is clearly up week-over-week. Average position is improving toward single digits on most days from May 3 onward, which matches the schema + internal-link wiring shipped 2026-05-03.

## Top pages

| Page | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| `/` | 33 | 212 | 15.57% | 5.08 |
| `/about` | 3 | 48 | 6.25% | 6.79 |
| `/blog` | 3 | 25 | 12.00% | 5.88 |
| `/blog/best-ai-journaling-apps` | 2 | 208 | 0.96% | 18.82 |
| `/blog/best-mood-tracker-apps` | 1 | 264 | 0.38% | 19.49 |
| `/blog/daylio-alternatives` | 1 | 212 | 0.47% | 8.75 |
| `/ai-journal` | 1 | 56 | 1.79% | 5.48 |
| `/blog/ai-journal-for-overthinking` | 1 | 12 | 8.33% | 6.83 |
| `/blog/3am-anxiety-journaling` | 1 | 5 | 20.00% | 3.20 |
| `/blog/best-self-reflection-apps` | 0 | 42 | 0.00% | 13.45 |
| `/blog/reflectly-alternatives` | 0 | 28 | 0.00% | 8.57 |
| `/mood-tracker` | 0 | 20 | 0.00% | 5.55 |
| `/voice-journaling` | 0 | 14 | 0.00% | 8.36 |
| `/blog/mood-tracker-for-self-awareness` | 0 | 14 | 0.00% | 11.21 |
| `/blog/apple-journal-alternatives` | 0 | 11 | 0.00% | 9.27 |
| `/guides/journaling` | 0 | 8 | 0.00% | 8.12 |

### Reading the page table

- The homepage CTR (15.57% at pos 5) is healthy. Do not over-rotate copy here.
- `/blog/best-mood-tracker-apps` is the top impression page on the entire site (264) at 0.38% CTR. Position 19 means page 2 — most of those impressions are unreachable without a position jump.
- `/blog/daylio-alternatives` is the most alarming line: 212 impressions at position 8.75 should land 2–4% CTR, not 0.47%. SERP appearance (title rewrite by Google? competing rich result? brand searcher bouncing to Daylio direct?) needs an eyeball check on a real SERP before another meta rewrite.
- `/mood-tracker` and `/voice-journaling` are page 1 (5.55, 8.36) with 0 clicks across 34 combined impressions. Title and meta are not earning the click.
- `/blog/3am-anxiety-journaling` quietly hit 20% CTR at position 3.2 on 5 impressions. Worth backlinking from anxiety / overthinking posts.

## Top queries

| Query | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| nuju | 5 | 71 | 7.04% | 8.86 |
| ai journaling app | 1 | 11 | 9.09% | 63.73 |
| mood tracker app | 0 | 25 | 0.00% | 65.84 |
| daylio alternative | 0 | 14 | 0.00% | 12.36 |
| mood tracker app market | 0 | 9 | 0.00% | 75.89 |
| ai journal app | 0 | 7 | 0.00% | 68.43 |
| nu ju | 0 | 4 | 0.00% | 6.25 |
| nujuu | 0 | 3 | 0.00% | 7.67 |
| ai journal app free | 0 | 3 | 0.00% | 62.67 |
| best ai journaling apps | 0 | 3 | 0.00% | 65.00 |
| emoko vs daylio | 0 | 2 | 0.00% | 6.50 |
| best mood tracking apps 2026 | 0 | 2 | 0.00% | 10.00 |
| ai journaling apps | 0 | 2 | 0.00% | 62.00 |
| best ai journal app | 0 | 2 | 0.00% | 77.50 |
| top rated mood tracking apps with ai insights | 0 | 1 | 0.00% | 1.00 |
| best ai journaling apps 2026 | 0 | 1 | 0.00% | 5.00 |
| apple journal alternative | 0 | 1 | 0.00% | 7.00 |
| best mood tracker apps 2026 | 0 | 1 | 0.00% | 10.00 |
| mood tracking apps with ai insights | 0 | 1 | 0.00% | 10.00 |
| top ai journaling apps 2026 | 0 | 1 | 0.00% | 10.00 |
| reflection app | 0 | 1 | 0.00% | 26.00 |
| apple journal alternative | 0 | 1 | 0.00% | 7.00 |

### Reading the query table

- Brand: "nuju" + misspellings ("nu ju", "nujuu") shows organic awareness is starting.
- Position 60–80 cluster for category queries ("ai journaling app", "mood tracker app", "ai journal app", "best ai journaling apps") = Google sees us as relevant but ranks us deep. These improve with backlinks, not more on-page rewrites.
- `daylio alternative` at position 12.36 with 14 impressions is the closest "almost page 1" commercial intent the site has.
- `emoko vs daylio` at position 6.5 on 2 impressions is a tiny but free entry into a new comparison cluster (Emoko = Daylio-style mood tracker). Worth a dedicated alternative page once the existing recommendation pages are stabilized.
- "best ai journaling apps 2026" at position 5 and "top ai journaling apps 2026" at position 10 confirm the "2026" suffix variants are findable — make sure the on-page H1/title and headings reflect 2026 freshness on the comparison posts.
- "top rated mood tracking apps with ai insights" sits at position 1 on 1 impression. Long-tail, but a clean signal that the AI-insights framing is differentiated.

## Geo

| Country | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| United States | 11 | 492 | 2.24% | 18.04 |
| Indonesia | 7 | 37 | 18.92% | 5.46 |
| India | 3 | 36 | 8.33% | 6.78 |
| Croatia | 3 | 5 | 60.00% | 4.60 |
| Canada | 2 | 35 | 5.71% | 10.40 |
| Singapore | 2 | 18 | 11.11% | 7.56 |
| Japan | 1 | 18 | 5.56% | 6.72 |
| Germany | 1 | 15 | 6.67% | 12.73 |

- US gets 50% of all impressions but the worst CTR among countries with real volume.
- Indonesia, India, Singapore, Japan: positions are clean (5–7) and CTRs are 5–19%. SEA is converting; the US SERP is not.
- Per execution roadmap, localization is gated behind "tighten the English commercial path first" — that gate still holds. But the data confirms SEA will be a real lane when localization opens.

## Device

| Device | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
| Mobile | 29 | 160 | 18.12% | 12.07 |
| Desktop | 13 | 809 | 1.61% | 13.72 |
| Tablet | 1 | 6 | 16.67% | 5.17 |

- Desktop is 83% of impressions but 30% of clicks. The desktop SERP listing is the bottleneck.
- Mobile CTR is 11x desktop CTR at similar position. Suggests the mobile snippet (or the audience expectation) is closing the loop better than desktop.

## Indexing

35-day indexing trend (snapshot per GSC):

| Date | Not indexed | Indexed | Impressions |
| --- | --- | --- | --- |
| 2026-04-06 | 3 | 1 | 2 |
| 2026-04-11 | 34 | 4 | 0 |
| 2026-04-18 | 25 | 10 | 2 |
| 2026-04-21 | 18 | 11 | 28 |
| 2026-04-28 | 23 | 15 | 34 |
| 2026-05-01 | 23 | 15 | 91 |
| 2026-05-02 | 27 | 17 | 62 |
| 2026-05-08 | 26 | 18 | 47 |

Top reasons reported by GSC:

| Reason | Source | Validation | Pages |
| --- | --- | --- | --- |
| Page with redirect | Website | Failed | 3 |
| Alternative page with proper canonical tag | Website | Failed | 1 |
| Discovered – currently not indexed | Google systems | Started | 22 |
| Blocked due to other 4xx issue | Website | Passed | 0 |
| Crawled - currently not indexed | Google systems | N/A | 0 |

- 22 pages "Discovered – currently not indexed" is the real fire. Google sees the URLs but is choosing not to crawl them. This usually means crawl-budget signals, thin content, or weak internal linking.
- 3 redirects flagged. Confirm `nuju.app` → `www.nuju.app` (or vice versa) is consistent and that no live route is bouncing through an old redirect.
- 1 "Alternative page with proper canonical tag" failed validation. Likely a www / non-www variant or a `#anchor` URL being treated as a duplicate — see the `/blog/best-ai-journaling-apps#...` rows already showing in top pages.

## What to do next

Sequenced so we earn clicks before we add inventory.

### This sprint

1. **Click-fix the top-impression blog pages.** `/blog/best-mood-tracker-apps`, `/blog/best-ai-journaling-apps`, `/blog/daylio-alternatives` together hold 684 impressions at sub-1% CTR. For the two at position ~19, the next lever is position, not meta — add 2–3 internal links from the homepage and the journaling guide and pull in one fresh comparison angle on each post. For `/blog/daylio-alternatives` at position 8.75 with 0.47% CTR, inspect the live SERP before another rewrite — the meta may already be fine and the issue is the SERP slot (rich snippet competition, brand result above the fold).
2. **Earn first click on `/mood-tracker` and `/voice-journaling`.** Both already rank page 1 with zero clicks across 34 impressions. Audit the rendered Google title and meta description for each — if Google is rewriting them, force it back with a sharper, specific title tag.
3. **Fix indexing.** Open Coverage in GSC, take the 22 "Discovered – currently not indexed" URLs and submit the highest-priority commercial ones (commercial landing + the three new alternative posts) via URL Inspection → Request Indexing. Fix the 3 redirect failures and the 1 alternate-canonical failure before next snapshot.
4. **Backlink wins to anxious / overthinking pages.** `/blog/3am-anxiety-journaling` is at 20% CTR position 3.2 — link to it from `/blog/mood-tracking-for-anxiety` and `/blog/ai-journal-for-overthinking` so the strong CTR page passes equity into the cluster.

### Next sprint (after click-fix lands)

1. **Emoko comparison cluster.** "emoko vs daylio" surfaced at position 6.5 on its own. Publish `/blog/emoko-alternatives` once the existing alternative pages are stable. Do not start before sprint 1 ships.
2. **2026-suffix freshness pass.** "best ai journaling apps 2026", "top ai journaling apps 2026", "best mood tracker apps 2026" all surface on tiny impressions at top-10 positions. Make sure the live posts say "2026" in title, H1, and intro paragraph — not buried lower.
3. **Desktop SERP listing audit.** Desktop CTR is the biggest single lift available. Pull the actual desktop SERP for the top three queries, screenshot the listing, and decide whether the fix is title rewrite, schema (BreadcrumbList already shipped — verify it renders), or just authority growth.
4. **Hold on localization.** Indonesia/Singapore/Japan are converting on tiny volume. The English commercial path still has obvious leaks. Defer localization per the 2026-04-22 roadmap.

## Notes for the next snapshot

- Re-pull GSC the week ending 2026-06-07 (28 days after this snapshot's tail).
- Re-measure: site total CTR, the three top-impression blog pages, the two commercial landing pages, and the "Discovered – currently not indexed" count.
- Update `page-system.md` "Near-term backlog" only after this snapshot's sprint actually shipped.
