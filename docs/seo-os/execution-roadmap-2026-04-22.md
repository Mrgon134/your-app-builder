# Nuju SEO Execution Roadmap

Updated: 2026-04-22

This roadmap turns the SEO OS into an execution sequence that matches the current Nuju app, public routes, and gating logic.

## Current truth

### Public surfaces already live

- `/`
- `/blog`
- `/guides/journaling`
- `/install`
- `/about`
- `/support`
- `/contact`
- `/privacy`
- `/terms`
- `/medical-disclaimer`
- 10 live recommendation-intent blog pages

### Technical foundation already in place

- canonical, OG, Twitter, and breadcrumb metadata via `SEOHead`
- `Article` and `FAQPage` schema on article pages
- sitemap and RSS generation in build
- static prerender for public routes
- `noindex` already applied to `/auth`, `/auth/callback`, and `/checkout/complete`

### Product and gating truth to keep SEO honest

Free users can credibly be promised:

- fast mood logging
- writing-based journaling
- basic recent insights
- recent history only

Paid access can credibly be promised:

- full history
- 30-day mood trends
- weekly summaries
- all coach personas
- unlimited coach access

Upper premium access can credibly be promised:

- voice journaling
- AI memory
- relationship mood map
- smart notifications / deeper pattern spotting

### Messaging risk to resolve in copy

The public billing surface currently sells by cadence:

- weekly
- annual
- lifetime

But feature logic and some internal copy still talk in feature-tier language:

- Plus
- Pro

For SEO pages, prioritize feature language over tier language until public packaging is fully unified.

Good:

- full history
- 30-day mood trends
- weekly summaries
- voice journaling
- AI memory

Risky:

- "Unlock Plus" as the primary public promise
- "Pro" language on pages that are supposed to rank for category or comparison intent unless the page also explains what that means in feature terms

## Main objective for the next 30 days

Increase qualified discovery for recommendation, comparison, and use-case intent, then convert that traffic into:

1. reveal starts
2. install visits
3. paid consideration

## Priority order

1. Align homepage and money-page messaging with the real product
2. Refresh live recommendation pages before publishing more informational content
3. Add product-style commercial landing pages outside the blog
4. Expand the recommendation backlog
5. Localize only after the English commercial path is tighter

## Page-by-page execution

| Route | Primary intent | Role | Primary CTA | Main job in funnel | What must be true on-page |
| --- | --- | --- | --- | --- | --- |
| `/` | `ai journaling app`, `mood tracker app` | Homepage money page | Reveal | category capture + conversion | clearly define Nuju as AI journal + mood tracker, explain recent free value vs deeper paid value, add software-style credibility |
| `/install` | branded + implementation intent | Conversion support page | Install | close already-convinced users | reinforce what users get immediately, reduce friction, connect install to reveal |
| `/blog/best-ai-journaling-apps` | category comparison | BOFU | Reveal | win recommendation intent | show test criteria, ranked options, where Nuju wins, where it does not |
| `/blog/best-mood-tracker-apps` | category comparison | BOFU | Reveal | capture mood-tracker buyers | connect mood tracking to self-awareness and paid trend features without overselling free |
| `/blog/best-journaling-apps-2026` | broad category comparison | BOFU | Reveal | catch broader journaling intent | position Nuju as best for people who want mood tracking + AI reflection, not just blank writing |
| `/blog/daylio-alternatives` | switch intent | BOFU | Reveal | win competitor switchers | respect what Daylio does well, show where Nuju is better for reflection and insight |
| `/blog/reflectly-alternatives` | switch intent | BOFU | Reveal | win competitor switchers | frame Nuju around depth, private reflection, and usable insights |
| `/blog/ai-journal-vs-traditional` | comparison intent | MOFU | Reveal | educate and pre-qualify | be balanced, explain when paper still wins, when Nuju wins |
| `/blog/mood-tracking-for-anxiety` | use-case intent | MOFU | Reveal | trust-building | keep non-therapy framing, emphasize pattern awareness and gentle support |
| `/blog/ai-journal-for-overthinking` | use-case intent | MOFU | Reveal | pain-point capture | explain why fast capture + guided reflection help overthinkers |
| `/blog/mood-tracker-for-self-awareness` | use-case intent | MOFU | Reveal | self-awareness intent | tie mood logging to trend discovery, highlight pattern spotting |
| `/blog/journaling-for-adhd` | use-case intent | MOFU | Reveal | friction-reduction intent | highlight low-friction journaling, short entries, voice option as paid step-up |
| `/guides/journaling` | informational pillar | Internal link hub | Reveal | authority + routing | push readers into recommendation pages and install, not just generic education |

## Exact work by page type

### Homepage

Add or tighten:

- `SoftwareApplication` schema
- a feature matrix that uses feature language instead of fuzzy tier language
- a short "Who Nuju is for" section
- a short "Nuju vs blank journal vs mood tracker" section
- stronger internal links to:
  - `/blog/best-ai-journaling-apps`
  - `/blog/best-mood-tracker-apps`
  - `/blog/daylio-alternatives`
  - `/blog/ai-journal-for-overthinking`
  - `/install`

Copy angle:

- "Start with quick check-ins and writing for free"
- "Unlock full history, trends, summaries, voice, and deeper pattern features if Nuju proves useful"

### Best X pages

Every category page should contain:

1. fast answer block
2. what we tested / how we judged
3. ranked list or decision table
4. where Nuju is strongest
5. where Nuju is not the best fit
6. privacy / trust section
7. reveal CTA
8. install CTA

Specific angle by page:

- `best-ai-journaling-apps`: Nuju wins for users who want mood tracking + reflection, not just chat
- `best-mood-tracker-apps`: Nuju wins for users who want emotional context, not just daily scoring
- `best-journaling-apps-2026`: Nuju wins for users who want a softer, guided, mobile-first system

### Alternative pages

Every alternative page should contain:

1. what the incumbent does well
2. where it becomes limiting
3. side-by-side comparison
4. why switch to Nuju
5. who should stay with the incumbent
6. privacy / trust
7. reveal CTA
8. install CTA

Specific angle by page:

- `daylio-alternatives`: shift from tracking-only to tracking plus reflection
- `reflectly-alternatives`: shift from prompts-only feel to more usable insight and pattern awareness

### Use-case pages

Every use-case page should contain:

1. problem framing without medical overclaim
2. why common advice fails
3. what a workable journaling system looks like
4. why Nuju fits
5. feature mapping
6. support boundary / non-therapy note
7. reveal CTA
8. install CTA

Specific feature mapping:

- anxiety: mood patterns, recent reflection, summaries after upgrading
- overthinking: fast capture, guided prompts, coach follow-up
- self-awareness: trends, summaries, history
- ADHD: low-friction input, fast entries, voice as the premium step-up

## New pages to build after refreshing live pages

These should be product-style landing pages, not blog posts:

1. `/ai-journal`
2. `/mood-tracker`
3. `/voice-journaling`

Optional second wave:

1. `/self-awareness-app`
2. `/journaling-for-overthinking`

Why these matter:

- the current SEO stack is strong on blog/comparison intent
- the site still needs direct commercial pages that can rank outside article format
- these pages can absorb internal links from blog pages and convert better than informational posts

## Internal linking rules for this sprint

- homepage links to the 3 strongest commercial blog pages
- every comparison page links to one use-case page and one install/reveal path
- every use-case page links to one comparison page and one install/reveal path
- the guide links out to every live recommendation page cluster
- install page links back to homepage and the strongest recommendation page

## Four-week sprint

### Week 1

- align homepage messaging with current gating truth
- refresh:
  - `/blog/best-ai-journaling-apps`
  - `/blog/best-mood-tracker-apps`
  - `/blog/best-journaling-apps-2026`

### Week 2

- refresh:
  - `/blog/daylio-alternatives`
  - `/blog/reflectly-alternatives`
  - `/blog/ai-journal-vs-traditional`
- strengthen internal links from homepage and blog index

### Week 3

- refresh use-case pages:
  - `/blog/mood-tracking-for-anxiety`
  - `/blog/ai-journal-for-overthinking`
  - `/blog/mood-tracker-for-self-awareness`
  - `/blog/journaling-for-adhd`
- launch `/ai-journal`

### Week 4

- launch `/mood-tracker`
- launch `/voice-journaling`
- add `SoftwareApplication` schema where appropriate
- publish the next strongest queued English article only if the commercial refresh work is already done

## Measurement

Track success per page by:

- impressions in Search Console
- clicks in Search Console
- CTR
- average position
- reveal starts from that page
- install clicks from that page

Page-level conversion event naming should stay consistent with the recommendation hub tracking already in the app.

## QA checklist before publishing any SEO update

- category language matches what the product really is
- free-vs-paid promises are accurate
- no therapy or medical overclaiming
- CTA is either reveal or install, not generic
- page links to the right next page in the system
- structured data matches the page type
- title and meta description are specific, not generic wellness filler

## One hard rule

Do not expand informational content just because it is easy to write.

If a page does not help Nuju win recommendation intent, switch intent, use-case intent, reveal starts, or installs, it is not a priority right now.
