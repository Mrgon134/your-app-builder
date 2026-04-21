# Nuju Web App

Nuju is a Vite + React web app for AI-assisted journaling. The frontend is ready to run on Vercel and uses Supabase for auth, data, storage, and edge functions.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production build runs Vite and then deterministically prerenders the public marketing, legal, and content routes into `dist/`. The prerender step is browserless, so it works on Vercel without Playwright or system Chromium dependencies.

## Vercel deployment

This repo is configured for Vercel via `vercel.json`:

- `framework`: `vite`
- `installCommand`: `npm install`
- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- SPA fallback rewrite to `/index.html` after filesystem routes are checked

## External config after deploy

Update these dashboard settings when the Vercel preview or production domain changes:

- Supabase Auth `Site URL`: `https://nuju.app`
- Supabase Auth redirect URLs:
  - `https://nuju.app/auth/callback`
  - your Vercel preview domain callback, for example `https://<deployment>.vercel.app/auth/callback`
- Google OAuth allowed redirect URIs to match the Supabase callback URLs above
- Any payment or provider dashboards that whitelist the frontend origin

## Notes

- Backend and data stay on the existing Supabase project `sxgmlnlqmdjjfmcypivi`.
- Dodo checkout return URLs are derived from the request origin, so they follow the active Vercel host automatically.
- `remotion/` remains an independent workspace and is not part of the main Vercel frontend deploy.
