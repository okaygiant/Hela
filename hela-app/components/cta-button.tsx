import Link from "next/link"
import { PRESS } from "@/components/press"

type Variant = "primary" | "promo"
const FILL: Record<Variant, string> = { primary: "bg-action-primary", promo: "bg-action-promo" }

type CtaButtonProps = {
  children: React.ReactNode
  /** Ждём ответ: вместо текста спиннер, кнопка не нажимается. */
  loading?: boolean
  disabled?: boolean
  /** primary: основная CTA; promo: оранжевая (Allow messages, 2X Boost) */
  variant?: Variant
} & Omit<React.ComponentProps<"button">, "className" | "children" | "disabled">

// Основная CTA из Figma (498:2354): h-button, пилюля, action-primary.
// Состояния pressed / focus / disabled / loading в макете не нарисованы, согласованы в чате.
export function CtaButton({ children, loading = false, disabled = false, variant = "primary", type = "button", ...rest }: CtaButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${PRESS} flex h-button w-full items-center justify-center rounded-full ${FILL[variant]} shadow-glass-button px-5 text-17 font-medium text-fg-primary disabled:bg-surface-glass-strong disabled:text-fg-secondary disabled:shadow-none`}
      {...rest}
    >
      {loading ? (
        <>
          <span aria-hidden className="size-5 animate-spin rounded-full border-2 border-line-default border-t-line-strong" />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Та же кнопка-ссылка: переходы между экранами (онбординг).
export function CtaLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: Variant }) {
  return (
    <Link
      href={href}
      className={`${PRESS} flex h-button w-full items-center justify-center rounded-full ${FILL[variant]} shadow-glass-button px-5 text-17 font-medium text-fg-primary`}
    >
      {children}
    </Link>
  )
}
