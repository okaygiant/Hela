"use client"

import { PRESS } from "@/components/press"
import { panelStore, usePanel } from "@/components/menu-store"

function MenuIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="currentColor" className="size-4">
      <rect x="2" y="3" width="8" height="1.3" rx="0.65" />
      <rect x="2" y="7.4" width="12" height="1.3" rx="0.65" />
      <rect x="2" y="11.8" width="12" height="1.3" rx="0.65" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className="size-4">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Кнопка меню из шапки Home (Figma 498:2354). Открывает меню, в которое превращается таббар.
export function MenuButton() {
  const open = usePanel() === "menu"
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Menu"}
      aria-expanded={open}
      onClick={() => panelStore.toggle("menu")}
      className={`${PRESS} relative flex size-chip items-center justify-center rounded-full bg-surface-glass text-fg-primary after:absolute after:-inset-2`}
    >
      {open ? <CloseIcon /> : <MenuIcon />}
    </button>
  )
}
