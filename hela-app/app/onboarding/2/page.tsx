import Image from "next/image"
import { CtaLink } from "@/components/cta-button"
import { OnboardingFrame } from "@/components/onboarding/shell"
import { TelegramBackButton } from "@/components/telegram-back-button"

// Источник: Figma «DE» → Onboarding 2 (498:2933), референс ui-pipeline/refs/07-onboarding-2-how-it-works.png.
const STEPS = [
  { n: 1, title: "Work", icon: "/helabet/icons/tab-work.webp", w: 160, h: 141, text: ["Take delivery or gig shifts.", "Earn coins."] },
  { n: 2, title: "Bet", icon: "/helabet/icons/tab-bet.webp", w: 160, h: 157, text: ["Use coins to bet on sports.", "Win or lose — strategy counts."] },
  { n: 3, title: "Play", icon: "/helabet/icons/tab-play.webp", w: 160, h: 160, text: ["Spend coins in mini-games.", "Multiply your balance."] },
]

export default function Onboarding2() {
  return (
    <OnboardingFrame zone="h-165" step={2} actions={<CtaLink href="/onboarding/3">Sounds good</CtaLink>}>
      <TelegramBackButton href="/onboarding/1" />
      <div className="flex flex-col gap-1.5 pt-10">
        <h1 className="text-34 font-bold">How Hela works</h1>
        <p className="text-16 font-medium text-fg-secondary">Three simple loops, one balance.</p>
      </div>

      <ol className="mt-8 flex flex-col">
        {STEPS.map((step, i) => (
          <li key={step.n} className="flex flex-col">
            <div className="flex items-start gap-4 rounded-card bg-surface-glass-strong p-4">
              <span
                aria-hidden
                className="flex size-chip shrink-0 items-center justify-center rounded-full bg-surface-glass text-12 font-semibold"
              >
                {step.n}
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Image src={step.icon} alt="" width={step.w} height={step.h} sizes="24px" className="h-5 w-auto" />
                  <h2 className="text-17 font-bold">{step.title}</h2>
                </div>
                <p className="text-13 font-medium text-fg-secondary">
                  {step.text[0]}
                  <br />
                  {step.text[1]}
                </p>
              </div>
            </div>
            {i < STEPS.length - 1 && <div aria-hidden className="my-2 ml-8 h-4 w-px bg-line-default" />}
          </li>
        ))}
      </ol>

      <p className="mt-8 flex items-center justify-center gap-2 text-12 font-normal text-fg-secondary">
        <Image src="/helabet/icons/coin.webp" alt="" width={160} height={160} sizes="16px" className="size-4" />
        Hela Coins – your in-app currency.
      </p>
    </OnboardingFrame>
  )
}
