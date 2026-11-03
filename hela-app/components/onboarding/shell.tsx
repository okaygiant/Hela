import { Pagination } from "@/components/onboarding/pagination"

// Каркас экранов онбординга: фон bg-app, зона контента, пагинация на позиции из макета, кнопки у нижнего края.
// Высота: каркас занимает ровно высоту окна. Hero сжимается (до 360), если экран низкий, а пагинация и кнопки
// привязаны к низу и стоят на одной высоте на всех экранах (слот кнопок фиксированной высоты).
export function OnboardingFrame({
  hero,
  step,
  actions,
  children,
}: {
  hero?: React.ReactNode
  step: number
  actions: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="flex h-app flex-col bg-surface-app pl-safe-left pr-safe-right pt-safe-top pb-safe-bottom text-fg-primary leading-auto">
      <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col">
        {hero}
        <div className="flex flex-1 flex-col px-gutter pb-6">
          <div>{children}</div>
          <div className="mt-auto pt-6">
            <Pagination step={step} />
          </div>
          <div className="flex min-h-30 flex-col pt-6">{actions}</div>
        </div>
      </div>
    </main>
  )
}

export function OnboardingText({ title, text }: { title: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 pt-8">
      <h1 className="text-gradient-heading text-34 font-bold">{title}</h1>
      <p className="text-16 font-medium text-fg-secondary">{text}</p>
    </div>
  )
}
