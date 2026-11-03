"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CtaButton } from "@/components/cta-button"
import { getTelegramWebApp } from "@/lib/telegram"

/**
 * «Allow messages»: просит у Telegram разрешение, чтобы бот мог писать пользователю
 * (напоминания о сменах и результатах ставок), и после ответа ведёт дальше.
 * Пока ждём ответ, кнопка в состоянии loading. Отказ не блокирует: идём дальше в любом случае.
 * Вне Telegram (браузер, симулятор) и в старых версиях (< 6.9) сразу переходит по ссылке.
 * TODO: когда появится бэкенд, отправлять ответ (allowed) на сервер.
 */
export function AllowMessagesButton({ href }: { href: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    const tg = getTelegramWebApp()
    if (!tg?.requestWriteAccess || !tg.isVersionAtLeast?.("6.9")) {
      router.push(href)
      return
    }
    setLoading(true)
    tg.requestWriteAccess(() => router.push(href))
  }

  return (
    <CtaButton variant="promo" loading={loading} onClick={onClick}>
      Allow messages
    </CtaButton>
  )
}
