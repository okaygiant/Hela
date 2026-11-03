import Link from "next/link"
import { AllowMessagesButton } from "@/components/allow-messages-button"
import { OnboardingHero } from "@/components/onboarding/hero"
import { OnboardingFrame, OnboardingText } from "@/components/onboarding/shell"
import { PRESS } from "@/components/press"
import { TelegramBackButton } from "@/components/telegram-back-button"

// Источник: Figma «DE» → Onboarding 3 (498:2864), референс ui-pipeline/refs/08-onboarding-3-notifications.png.
export default function Onboarding3() {
  return (
    <OnboardingFrame
      hero={<OnboardingHero mascot="phone" />}
      step={3}
      actions={
        <>
          <AllowMessagesButton href="/" />
          <Link
            href="/"
            className={`${PRESS} flex h-11 items-center justify-center text-17 font-medium text-fg-primary opacity-50`}
          >
            Maybe later
          </Link>
        </>
      }
    >
      <TelegramBackButton href="/onboarding/2" />
      <OnboardingText
        title={
          <>
            Don&apos;t miss
            <br />
            your shifts
          </>
        }
        text={
          <>
            We&apos;ll remind you before a shift starts
            <br />
            and when a bet result is in.
          </>
        }
      />
    </OnboardingFrame>
  )
}
