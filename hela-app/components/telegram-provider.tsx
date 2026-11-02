"use client"

import { useEffect } from "react"
import { getTelegramWebApp, isInsideTelegram } from "@/lib/telegram"

/**
 * Инициализация Telegram Mini App SDK.
 * - сообщает Telegram, что интерфейс готов (ready), и раскрывает окно на всю высоту (expand);
 * - помечает <html> атрибутами data-tg / data-tg-platform для стилей и отладки.
 * Вне Telegram (обычный браузер) ничего не ломает: SDK-объект там пустой.
 * Цвета шапки и фона Telegram, полноэкранный режим и запрет вертикальных свайпов
 * сюда НЕ включены (решение по продукту не принято, см. ui-pipeline/ui-kit.md, раздел 1).
 */
export function TelegramProvider() {
  useEffect(() => {
    const tg = getTelegramWebApp()
    if (!tg) return

    tg.ready()
    tg.expand()

    const root = document.documentElement
    root.dataset.tg = isInsideTelegram() ? "true" : "false"
    root.dataset.tgPlatform = tg.platform
  }, [])

  return null
}
