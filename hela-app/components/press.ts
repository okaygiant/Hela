// Общие состояния нажатия и фокуса для всех кнопок (решение: сжатие + затемнение).
// Hover не используем: интерфейс только для касаний (UI_RULES, раздел 7).
// not-disabled, а не enabled: подходит и <button>, и <Link> (у ссылки нет состояния :enabled).
export const PRESS =
  "transition-all duration-200 ease-out not-disabled:active:scale-95 not-disabled:active:brightness-90 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-line-strong"
