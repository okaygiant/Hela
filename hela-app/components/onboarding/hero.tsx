import Image from "next/image"

// Hero онбординга 1 и 3 (Figma 498:2729 и 498:2868): логотип, лавры, маскот, рейтинг, лента hela.bet.
// Размеры снапнуты к шкале: отклонение от макета ≤ 2px (см. отчёт).
// Картинки лежат в public/onboarding (скачиваются скриптом ui-pipeline/preview/fetch-onboarding-assets.sh).

// Левый лавр = зеркальная копия правого (в макете левая картинка с другим поворотом, выглядела не параллельно).
function Laurel({ side }: { side: "left" | "right" }) {
  return (
    <div aria-hidden className="flex h-27 w-17 items-center justify-center">
      <Image
        src="/onboarding/laurel-right.svg"
        alt=""
        width={50}
        height={100}
        className="h-25 w-12 max-w-none"
        style={{ transform: side === "left" ? "scaleX(-1) rotate(-10.98deg)" : "rotate(-10.98deg)" }}
      />
    </div>
  )
}

export function OnboardingHero({ mascot }: { mascot: "backpack" | "phone" }) {
  return (
    <section className="relative h-100 bg-surface-hero before:absolute before:inset-x-0 before:bottom-full before:h-10 before:bg-surface-hero">
      <div className="absolute inset-0 overflow-hidden">
        {/* Свечение за маскотом: в макете два одинаковых слоя */}
        <div aria-hidden className="absolute inset-x-0 top-35 flex h-20 items-center justify-center">
          {[0, 1].map((i) => (
            <Image
              key={i}
              src="/onboarding/glow.svg"
              alt=""
              width={568}
              height={482}
              className="absolute max-w-none"
            />
          ))}
        </div>

        <Image
          src="/onboarding/logo.svg"
          alt="hela.bet"
          width={60}
          height={13}
          className="absolute top-10 left-1/2 h-auto w-15 -translate-x-1/2"
        />

        {mascot === "backpack" && (
          <div aria-hidden className="absolute top-28 left-1/2 ml-1.5 flex -translate-x-1/2 items-start gap-5">
            <Image src="/onboarding/sparkle.webp" alt="" width={22} height={20} className="h-5 w-auto rotate-180" />
            <Image src="/onboarding/sparkle.webp" alt="" width={9} height={8} className="mt-2.5 h-2 w-auto" />
          </div>
        )}

        {/* Лавры по краям, маскот по центру */}
        <div className="absolute inset-x-0 top-32 flex h-27 items-center justify-between px-13">
          <Laurel side="left" />
          <Laurel side="right" />
          {mascot === "backpack" ? (
            <div aria-hidden className="absolute top-1/2 left-1/2 size-45 -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/onboarding/mascot-backpack.webp"
                alt=""
                fill
                preload
                sizes="180px"
                className="object-cover"
              />
            </div>
          ) : (
            <div aria-hidden className="absolute top-1/2 left-1/2 h-33 w-29 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
              {/* Кадрирование как в макете: картинка шире блока на 14% и сдвинута влево на 4,3% */}
              <div className="absolute inset-y-0" style={{ width: "114.11%", left: "-4.32%" }}>
                <Image
                  src="/onboarding/mascot-phone.webp"
                  alt=""
                  fill
                  preload
                  sizes="132px"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Рейтинг */}
        <div className="absolute inset-x-0 top-75 flex items-center justify-center gap-1">
          <Image src="/onboarding/stars.svg" alt="" width={97} height={15} className="h-auto w-24" />
          <span className="text-16 font-normal opacity-40">5.0</span>
          <span className="sr-only">Rating 5.0 out of 5</span>
        </div>

        {/* Лента hela.bet: «бесконечная», уходит за края экрана с обеих сторон */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 flex h-8 items-center justify-center overflow-hidden bg-surface-marquee backdrop-blur-glass-md"
        >
          <div className="flex w-max shrink-0 items-center gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex shrink-0 items-center gap-4">
                {i > 0 && <span className="size-1 rounded-full bg-fg-secondary" />}
                <Image src="/onboarding/marquee.svg" alt="" width={359} height={8} className="h-auto w-90 max-w-none shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
