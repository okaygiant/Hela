import { CtaLink } from "@/components/cta-button"
import { OnboardingHero } from "@/components/onboarding/hero"
import { OnboardingFrame, OnboardingText } from "@/components/onboarding/shell"

// Источник: Figma «DE» → Onboarding 1 (498:2725), референс ui-pipeline/refs/05-onboarding-1-welcome.png.
export default function Onboarding1() {
  return (
    <OnboardingFrame
      hero={<OnboardingHero mascot="backpack" />}
      step={1}
      actions={<CtaLink href="/onboarding/2">Get Started</CtaLink>}
    >
      <OnboardingText
        title={
          <>
            Turn every shift
            <br />
            into a reward.
          </>
        }
        text={
          <>
            Work gig shifts. Earn coins.
            <br />
            Bet, play, and grow your balance.
          </>
        }
      />
    </OnboardingFrame>
  )
}
