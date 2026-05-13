# Nuju Recommendation-First SEO OS

This directory is the operating system for Nuju's recommendation-first SEO work.

It is intentionally narrower than the original 10-prompt stack. The goal is not to generate more SEO output. The goal is to make Nuju easier to recommend in:

- ChatGPT Search
- Google recommendation and comparison queries
- app roundups, alternatives pages, and use-case searches

## V1 focus

- Primary market: US English
- Primary outcome: discovery, recommendation inclusion, and reveal starts
- Secondary outcome: classic organic rankings

## Core principle

Every recommendation page should answer six questions fast:

1. Who is Nuju for?
2. When should someone choose Nuju?
3. Why choose it over alternatives?
4. How private is it?
5. What happens after the first click?
6. What is the next action: reveal or install?

## Modules

1. [Nuju business context](./nuju-business-context.md)
2. [Recommendation query map](./recommendation-query-map.md)
3. [Prompt modules](./prompt-modules.md)
4. [Page system](./page-system.md)
5. [Entity and distribution checklist](./entity-distribution-checklist.md)
6. [Execution roadmap (2026-04-22)](./execution-roadmap-2026-04-22.md)
7. [GSC snapshot (2026-05-10)](./gsc-snapshot-2026-05-10.md)

## How to use this OS

1. Start with the business context and update it when product or positioning changes.
2. Pull target pages from the recommendation query map, not from random topic ideas.
3. Use the six prompt modules as workflows, not one-shot prompts.
4. Ship or refresh recommendation pages before expanding informational content.
5. Run the QA gate before anything goes live.

## What this OS avoids

- broad topical clustering with weak commercial fit
- fake precision from backlink or NLP tooling without real data inputs
- publishing educational content that does not feed landing or install
- mental wellness claims that drift into therapy or medical promises
