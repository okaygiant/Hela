// Общие состояния нажатия и фокуса для всех кнопок (решение: сжатие + затемнение).
// Hover не используем: интерфейс только для касаний (UI_RULES, раздел 7).
export const PRESS =
  "transition-all duration-200 ease-out enabled:active:scale-95 enabled:active:brightness-90 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-line-strong"
