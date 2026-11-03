"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getTelegramWebApp } from "@/lib/telegram"

/**
 * Включает нативную кнопку «назад» в шапке Telegram и ведёт по нажатию на href.
 * Рисовать свою стрелку не нужно (UI_RULES, раздел 7). Вне Telegram ничего не делает.
 * При уходе с экрана кнопка прячется, и в шапке снова стоит «Закрыть».
 */
export function TelegramBackButton({ href }: { href: string }) {
  const router = useRouter()

  useEffect(() => {
    const back = getTelegramWebApp()?.BackButton
    if (!back) return
    const onClick = () => router.push(href)
    back.onClick(onClick)
    back.show()
    return () => {
      back.offClick(onClick)
      back.hide()
    }
  }, [href, router])

  return null
}
