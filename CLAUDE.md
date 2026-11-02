# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

HelaSimulator — a Next.js 16 app that renders pixel-faithful iPhone UI mockups for the "Hela" gamified earnings app. The goal is fidelity to real iOS design: correct system chrome (Dynamic Island, status bar, tab bar), iOS-system colors, SF Pro typography, and micro-interactions (ripples, spring animations, badge pops).

## Commands

All commands run from `hela-app/`:

```bash
npm run dev      # start dev server (Turbopack) → http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

No test suite is configured. Puppeteer is available in devDependencies for screenshot automation.

## Routes

| Route | Description |
|---|---|
| `/` | Dark purple Figma-style mockup (Tailwind + shadcn) |
| `/ios-native` | iOS 18 — original implementation using base shadcn components |
| `/ios-native/sortui` | iOS 18 — SortUI variant: same layout but uses extended SortUI components |
| `/ios-native/preview` | Either variant inside a hardware iPhone 16 shell |
| `/tg` | Telegram Mini App — dark header chrome wrapping `IOSNativeHome` with `hideNavBar={true}` |
| `/contacts` | Contact list overlay prototype — all inline styles, self-contained phone frame, no shadcn |
| `/compare` | Side-by-side render of `/ios-native` (left) and `/ios-native/sortui` (right) |

`app/manifest.ts` sets `start_url: "/tg"` — the PWA is intended to launch the Telegram view.

## Architecture

```
hela-app/
  app/
    layout.tsx              # Root layout (Geist + Inter fonts, dark bg)
    page.tsx                # "/" — dark Figma-style mockup
    manifest.ts             # PWA manifest (start_url: /tg)
    ios-native/
      page.tsx              # IOSNativeHome — original shadcn implementation
      sortui/page.tsx       # SortUIHome — parallel SortUI implementation (same props)
      preview/page.tsx      # Wraps IOSNativeHome in an iPhone 16 hardware frame
    tg/page.tsx             # Telegram Mini App — dark header + IOSNativeHome
    compare/page.tsx        # Side-by-side: IOSNativeHome (left) vs SortUIHome (right)
  components/ui/            # shadcn + SortUI components
  lib/utils.ts              # re-exports `cn` from the "cn" package
```

### `IOSNativeHome` / `SortUIHome` props

Both `app/ios-native/page.tsx` and `app/ios-native/sortui/page.tsx` export a default component with identical props:

```ts
({ fakeStatusBar?: boolean, hideNavBar?: boolean, hideStatusBar?: boolean })
```

- `fakeStatusBar` — render a static status bar (Dynamic Island + time/signal/battery); used when embedding in a frame that provides its own bezel
- `hideNavBar` — hide the top nav bar row; used by `/tg` where Telegram provides its own chrome
- `hideStatusBar` — suppress the time/signal/battery row inside the fake status bar area

### Two parallel home implementations

`ios-native/page.tsx` (original) and `ios-native/sortui/page.tsx` (SortUI variant) implement the same Hela home screen. The SortUI variant differs in:

- **Component set**: uses `Progress`/`ProgressTrack`/`ProgressIndicator` for XP bar; `Marker`/`MarkerIcon`/`MarkerContent` for streak dots; `Item`/`ItemMedia`/`ItemContent`/`ItemTitle`/`ItemDescription`/`ItemActions` for transaction rows; `Spinner` inside the Boost button; `Tooltip`/`TooltipProvider` wrapping the Boost button; `Carousel`/`CarouselContent`/`CarouselItem` for horizontal promo cards.
- **FAB**: replaces the `MoreIcon` circle trigger with a `.fab-btn` "Play" button (CSS-only animated glow effect from uiverse dexter-st).
- **Theme scoping**: wraps the root `<div>` in `.sortui-dark` CSS class, which overrides all shadcn CSS variables to a neutral dark palette with `oklch(0.42 0.22 290)` purple accent — isolating SortUI tokens from the Hela brand variables in `globals.css`.
- **Progressive blur**: adds a bottom fade layer (`backdrop-filter: blur(20px)` + mask gradient) behind the FAB.

## Styling approach

Three patterns are in use across routes:

- **`ios-native/page.tsx` and `ios-native/sortui/page.tsx`** — mixed: inline styles for all iOS system chrome (status bar, Dynamic Island, tab bar, scroll container); Tailwind + shadcn for card content. The `GLASS` constant holds the shared dark-glass card class string. All keyframe animations are injected via a `<style>` tag inside the component.
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
- Fixed phone dimensions: width `390`, minHeight `844` (iPhone 16 logical points). The hardware preview frame (`preview/page.tsx`) uses `430×932` outer with the screen clipped inside.
- iOS system palette constants used throughout `ios-native/page.tsx`: `#007AFF` (blue), `#8E8E93` (secondary label), `#F2F2F7` (system background), `#FF9500` (orange), `#34C759` (green).
- Liquid glass sphere classes (`.lg-blue`, `.lg-orange`, `.lg-green`) are defined inside the component's `<style>` block — they use `radial-gradient` + layered `box-shadow` to simulate the iOS 18 glass icon look. Do not move them to `globals.css`; they must stay scoped.

## Next.js version note

This project runs Next.js 16 with breaking changes from earlier versions. Before writing routing, data-fetching, or config code, check `node_modules/next/dist/docs/` for the current API (as noted in `AGENTS.md`).

## UI rules

Before any UI work, read `ui-pipeline/UI_RULES.md` (tokens in `hela-app/app/tokens.css`, patterns in `ui-pipeline/ui-kit.md`, screen references in `ui-pipeline/refs/`).
