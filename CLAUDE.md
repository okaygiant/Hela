# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

HelaSimulator — a Next.js 16 app that renders pixel-faithful iPhone UI mockups for the "Hela" gamified earnings app. The goal is fidelity to real iOS design: correct system chrome (Dynamic Island, status bar, tab bar), iOS-system colors, SF Pro typography, and micro-interactions (ripples, spring animations, badge pops).

## Commands

All commands run from `hela-app/`:

```bash
npm run dev      # start dev server (Turbopack) → http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

No test suite is configured. Puppeteer is available in devDependencies for screenshot automation.

## Routes

| Route | Description |
|---|---|
| `/` | Dark purple Figma-style mockup (Tailwind + shadcn) |
| `/ios-native` | iOS 18 light-theme interactive mockup |
| `/ios-native/preview` | iOS mockup inside a hardware iPhone 16 shell |
| `/tg` | Telegram Mini App view — dark Telegram header chrome wrapping `IOSNativeHome` with `hideNavBar={true}` |
| `/contacts` | Contact list overlay prototype — all-inline styles, self-contained phone frame, no shadcn |

`app/manifest.ts` sets `start_url: "/tg"` — the PWA is intended to launch the Telegram view.

## Architecture

```
hela-app/
  app/
    layout.tsx              # Root layout (Geist + Inter fonts, dark bg)
    page.tsx                # "/" — dark Figma-style mockup
    manifest.ts             # PWA manifest (start_url: /tg)
    ios-native/
      page.tsx              # IOSNativeHome component — the core iOS UI
      preview/page.tsx      # Wraps IOSNativeHome in an iPhone 16 hardware frame
    tg/
      page.tsx              # Telegram Mini App — dark header + IOSNativeHome
  components/ui/            # shadcn components (avatar, badge, button, card, progress, separator)
  lib/utils.ts              # re-exports `cn` from the "cn" package
```

### `IOSNativeHome` props

`app/ios-native/page.tsx` exports `IOSNativeHome` as a reusable component consumed by all three sub-routes:

```ts
IOSNativeHome({ fakeStatusBar?: boolean, hideNavBar?: boolean, hideStatusBar?: boolean })
```

- `fakeStatusBar` — render a static status bar instead of relying on real system chrome (used in preview frame)
- `hideNavBar` — hide the top nav bar row (used by `/tg` where Telegram provides its own chrome)
- `hideStatusBar` — suppress the time/signal/battery row inside the fake status bar area (useful when embedding without a status bar)

## Styling approach

Three patterns are in use across routes:

- **`ios-native/page.tsx`** — mixed: inline styles for all iOS system chrome (status bar, Dynamic Island, tab bar, scroll container); Tailwind + shadcn for card content. The `GLASS` constant holds the shared dark-glass card class string.
- **`app/page.tsx`** — Tailwind + shadcn only (no inline styles), uses CSS variables from `globals.css`.
- **`contacts/page.tsx`** — all inline styles, self-contained phone frame (no shadcn, no Tailwind).

### Brand CSS tokens (`globals.css`)

`app/page.tsx` and shadcn components consume these dark-theme variables (do not use raw hex in new Tailwind code; reference these tokens):

| Token | Value | Usage |
|---|---|---|
| `--background` | `#120B2E` | page background |
| `--primary` | `#F5C518` | yellow CTA |
| `--secondary` / `--accent` | `#7B2FBE` | purple accent |
| `--card` | `#1E1248` | card fill |
| `--muted-foreground` | `#9B8EC4` | secondary text |

## Key conventions

- **Tailwind v4** via `@tailwindcss/turbopack` — no `tailwind.config.js`, config lives in `globals.css`.
- shadcn uses `base-nova` style with `@base-ui/react` as the underlying primitive library.
- `cn()` is imported directly from the `cn` npm package (not `@/lib/utils`) in `ios-native/page.tsx`.
- Fixed phone dimensions: width `390`, minHeight `844` (iPhone 16 logical points).
- iOS system palette constants used throughout `ios-native/page.tsx`: `#007AFF` (blue), `#8E8E93` (secondary label), `#F2F2F7` (system background), `#FF9500` (orange), `#34C759` (green).

## Next.js version note

This project runs Next.js 16 with breaking changes from earlier versions. Before writing routing, data-fetching, or config code, check `node_modules/next/dist/docs/` for the current API (as noted in `AGENTS.md`).
