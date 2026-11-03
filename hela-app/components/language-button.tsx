"use client"

import { PRESS } from "@/components/press"
import { LANGUAGES, panelStore, useLanguage, usePanel } from "@/components/menu-store"

// Кнопка языка из шапки Home (Figma 498:2354): флаг текущего языка. Открывает полноэкранный выбор.
export function LanguageButton() {
  const open = usePanel() === "language"
  const code = useLanguage()
  const flag = LANGUAGES.find((l) => l.code === code)?.flag
  return (
    <button
      type="button"
      aria-label="Language"
      aria-expanded={open}
      onClick={() => panelStore.toggle("language")}
      className={`${PRESS} relative flex size-chip items-center justify-center rounded-full bg-surface-glass after:absolute after:-inset-2`}
    >
      <span aria-hidden className="text-16 leading-none">
        {flag}
      </span>
    </button>
  )
}
