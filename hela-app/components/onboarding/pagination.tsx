// Пагинация онбординга (Figma 498:2768): активная 24×8 золотая, остальные точки 8×8 при прозрачности 0,2.
export function Pagination({ step, total = 3 }: { step: number; total?: number }) {
  return (
    <div role="img" aria-label={`Step ${step} of ${total}`} className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, i) =>
        i + 1 === step ? (
          <span key={i} className="h-2 w-6 rounded-full bg-dot-active" />
        ) : (
          <span key={i} className="size-2 rounded-full bg-dot-inactive opacity-20" />
        ),
      )}
    </div>
  )
}
