import { BackgroundVideo } from "@/components/background-video"
import { CtaLink } from "@/components/cta-button"
import { ShiftCountdown } from "@/components/shift-countdown"

// Источник: Figma «DE» → Waiting for shift (498:2661), референс ui-pipeline/refs/03-waiting-for-shift.png.
// Шапку «mini app» рисует Telegram, статус-бар и рамку тоже (UI_RULES, раздел 7).
// Видео и постер лежат в public/shift (исходник giraffe-chilling.mp4 сжат до 720×1280 без звука).

// TODO: время до смены придёт с сервера. Пока для просмотра отсчёт идёт с 15 секунд, как в макете.
const NEXT_SHIFT_IN_SECONDS = 15

export default function WaitingForShift() {
  return (
    <main className="relative isolate flex min-h-app flex-col justify-end overflow-hidden bg-surface-app pl-safe-left pr-safe-right pb-safe-bottom text-fg-primary leading-auto">
      {/* Видео на весь экран (в макете фото, заменено на видео по просьбе) */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <BackgroundVideo src="/shift/waiting.mp4" poster="/shift/waiting-poster.webp" />
      </div>

      {/* Скрим под текстом, плавный край блюра */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-74 bg-scrim-bottom backdrop-blur-glass-sm mask-t-from-40%" />

      <div className="flex flex-col items-center gap-3 px-gutter pb-8">
        <h1 className="text-gradient-heading text-34 font-bold">Next shift in:</h1>
        <ShiftCountdown seconds={NEXT_SHIFT_IN_SECONDS} />
        <div className="mt-5 w-full">
          <CtaLink href="/">Go to Bets</CtaLink>
        </div>
      </div>
    </main>
  )
}
