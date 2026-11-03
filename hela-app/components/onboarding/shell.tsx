import { Pagination } from "@/components/onboarding/pagination"

// Каркас экранов онбординга: фон bg-app, зона контента, пагинация на позиции из макета, кнопки у нижнего края.
// zone: высота зоны контента до пагинации (классом, чтобы Tailwind видел значение). Макет: пагинация на y = 658 от верха контента.
export function OnboardingFrame({
  hero,
  zone,
  step,
  actions,
  children,
}: {
  hero?: React.ReactNode
  zone: string
  step: number
  actions: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <main className="min-h-app bg-surface-app pl-safe-left pr-safe-right pt-safe-top pb-safe-bottom text-fg-primary leading-auto">
      <div className="mx-auto flex min-h-app max-w-md flex-col">
        {hero}
        <div className="flex flex-1 flex-col px-gutter pb-6">
          <div className={zone}>{children}</div>
          <Pagination step={step} />
          <div className="mt-auto flex flex-col pt-8">{actions}</div>
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
