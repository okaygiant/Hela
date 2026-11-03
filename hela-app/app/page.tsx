import Image from "next/image"
import { CtaButton } from "@/components/cta-button"
import { LanguageButton } from "@/components/language-button"
import { MenuButton } from "@/components/menu-button"
import { PRESS } from "@/components/press"
import { TabBar } from "@/components/tab-bar"

// Источник: Figma «DE» → Home (498:2354), референс ui-pipeline/refs/01-home.png.
// Правила: ui-pipeline/UI_RULES.md. Только токены и классы из tokens-tailwind.css.

const STREAK_DAYS = 3
const WEEK = ["M", "T", "W", "T", "F", "S", "S"]
const XP = 78
const XP_MAX = 200

// Кроп картинки плитки (в процентах от плитки), снят с макета.
const TILES = [
  {
    title: "Invite & Earn",
    caption: "Earn up to 500",
    src: "/helabet/giraffe-hero.png",
    fill: "bg-gradient-tile-green",
    top: "-18%",
  },
  {
    title: "Daily Reward",
    caption: "Claim your rewards",
    src: "/helabet/daily-reward.png",
    fill: "bg-gradient-tile-gold",
    top: "-16%",
  },
]

function Chip({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`flex h-chip items-center rounded-full bg-surface-glass px-3 text-12 font-semibold text-fg-primary ${className}`}
    >
      {children}
    </div>
  )
}

function ChevronRight() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className="size-4 shrink-0 text-fg-primary">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <main className="min-h-app bg-surface-hero pl-safe-left pr-safe-right pt-safe-top pb-safe-bottom text-fg-primary leading-auto">
      <div className="mx-auto flex max-w-md flex-col gap-3 px-gutter pt-2 pb-28">
        {/* Шапка: баланс, стрик, язык и меню */}
        <header className="flex h-8 items-center">
          <div className="flex flex-1 items-center gap-2.5">
            <div className="relative size-8 shrink-0">
              <div className="relative size-8 overflow-hidden rounded-full bg-accent-gold">
                <Image
                  src="/helabet/giraffe-main.png"
                  alt=""
                  width={941}
                  height={1671}
                  sizes="80px"
                  className="absolute top-0 max-w-none"
                  style={{ width: "239%", left: "-82%", height: "auto" }}
                />
              </div>
              <Image
                src="/helabet/icons/coin.webp"
                alt=""
                width={160}
                height={160}
                sizes="16px"
                className="absolute top-4 left-6 size-4"
              />
            </div>
            <span className="text-14 font-bold text-fg-accent">999,99</span>
          </div>

          <Chip className="gap-1.5">
            <Image src="/helabet/icons/flame.webp" alt="" width={139} height={160} sizes="16px" className="h-3 w-auto" />
            3 days
          </Chip>

          <div className="flex flex-1 items-center justify-end gap-2">
            <LanguageButton />
            <MenuButton />
          </div>
        </header>

        {/* Hero */}
        <section className="relative h-75 overflow-hidden rounded-32 bg-surface-hero-deep">
          <Image
            src="/helabet/home-hero.webp"
            alt="Giraffe in sunglasses and a suit"
            fill
            preload
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-scrim-bottom backdrop-blur-glass-md mask-t-from-40%" />
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
            <Chip className="gap-2.5">
              <span>Rank bonus</span>
              <span className="text-fg-accent">×1.15</span>
            </Chip>
            <Chip className="gap-1.5">
              <Image src="/helabet/icons/lightning.webp" alt="" width={129} height={160} sizes="16px" className="h-3 w-auto" />
              LVL 10
            </Chip>
          </div>
        </section>

        {/* CTA */}
        <CtaButton>Activate 2X Boost</CtaButton>

        {/* Streak Calendar */}
        <section className="relative isolate flex flex-col gap-4 overflow-hidden rounded-card bg-surface-glass-strong p-4">
          <div aria-hidden className="pointer-events-none absolute -top-6 left-12 -z-10 h-5 w-64 rounded-full bg-accent-gold blur-glow-sm" />
          <div aria-hidden className="pointer-events-none absolute -top-6 left-12 -z-10 h-5 w-64 rounded-full bg-accent-gold blur-glow-sm" />
          <h2 className="text-15 font-semibold text-fg-primary">Streak Calendar</h2>
          <div className="flex justify-between">
            {WEEK.map((letter, i) => {
              const done = i < STREAK_DAYS
              const nextDone = i + 1 < STREAK_DAYS
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`relative flex size-chip items-center justify-center rounded-full ${
                      done ? "bg-gradient-gold" : "bg-surface-glass"
                    }`}
                  >
                    {done && (
                      <Image src="/helabet/icons/flame.webp" alt="" width={139} height={160} sizes="24px" className="h-5 w-auto" />
                    )}
                    {nextDone && <span aria-hidden className="absolute top-1/2 left-full ml-1 h-px w-2 bg-accent-gold" />}
                  </div>
                  <span className={`text-11 font-semibold ${done ? "text-fg-primary" : "text-fg-secondary"}`}>
                    {letter}
                    {done && <span className="sr-only"> completed</span>}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Career */}
        <section className="flex flex-col gap-3 rounded-card bg-gradient-card p-4">
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex flex-col gap-1">
              <p className="text-11 font-semibold tracking-caps text-fg-secondary uppercase">Your career</p>
              <div className="flex items-center gap-2">
                <h2 className="text-24 font-bold text-fg-primary">Runner</h2>
                <Chip className="gap-1.5">
                  <Image src="/helabet/icons/lightning.webp" alt="" width={129} height={160} sizes="16px" className="h-3 w-auto" />
                  LVL 10
                </Chip>
              </div>
            </div>
            <ChevronRight />
          </div>

          <div className="flex h-7 items-center gap-4">
            <div
              role="progressbar"
              aria-label="Career XP"
              aria-valuemin={0}
              aria-valuemax={XP_MAX}
              aria-valuenow={XP}
              className="h-1 flex-1 rounded-full bg-progress-track"
            >
              <div className="h-full rounded-full bg-gradient-progress" style={{ width: `${(XP / XP_MAX) * 100}%` }} />
            </div>
            <span className="text-13 font-medium text-fg-secondary">
              {XP} / {XP_MAX} XP
            </span>
          </div>

          <p className="flex h-6 w-fit items-center gap-1.5 rounded-8 bg-gradient-success-chip px-2 text-13 font-medium text-fg-success">
            <Image src="/helabet/icons/arrow-up.webp" alt="" width={148} height={160} sizes="16px" className="h-3 w-auto" />
            Top 12% of runners this week
          </p>
        </section>

        {/* Promo tiles: лента выходит за поля экрана */}
        <div className="-mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-3 overflow-x-auto px-gutter">
          {TILES.map((tile) => (
            <button
              key={tile.title}
              type="button"
              className={`${PRESS} relative h-25 w-45 shrink-0 snap-start overflow-hidden rounded-card text-left ${tile.fill}`}
            >
              <Image
                src={tile.src}
                alt=""
                width={1672}
                height={941}
                sizes="290px"
                className="absolute max-w-none"
                style={{ width: "160.5%", left: "-27.5%", top: tile.top, height: "auto" }}
              />
              <span className="absolute inset-x-0 bottom-0 h-9 bg-scrim-bottom backdrop-blur-glass-md mask-t-from-40%" />
              <span className="absolute bottom-3 left-3 flex flex-col gap-0.5">
                <span className="text-15 font-bold text-fg-primary">{tile.title}</span>
                <span className="flex items-center gap-1 text-11 text-fg-primary">
                  {tile.caption}
                  <Image src="/helabet/icons/coin.webp" alt="" width={160} height={160} sizes="16px" className="size-3" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <TabBar />
    </main>
  )
}
