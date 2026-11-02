# refs/ — референсы экранов Hela

Экспорт из Figma «DE» (`cm9ueRUqblIdeipUobd3eI`), секция «App» (`498:2353`), дата экспорта 2026-11-02.
Это визуальная сверка, не источник значений: размеры и цвета бери из токенов, макет в Figma главнее PNG.

**Что убрано:** хром Telegram (статус-бар, шапка «Helabet Simulator / mini app», рамка телефона): верхние 122 px кадра.
**Размер файлов:** 390 × 862 px, масштаб 1×. Верхний край PNG = низ шапки Telegram (`--safe-top` в коде).
Нижние углы у файлов чёрные: это рамка телефона из макета, в вёрстке их нет.

| Файл | Экран | Figma node | Что смотреть |
|---|---|---|---|
| `01-home.png` | Главная («App») | `498:2354` | hero-карточка, CTA, Streak Calendar, Career, tab bar |
| `02-home-scrolled.png` | Главная при скролле («Scroll») | `498:2504` | компактный hero, карточки Invite/Daily Reward, stat card |
| `03-waiting-for-shift.png` | Ожидание смены | `498:2661` | full-bleed фото, таймер, CTA «Go to Bets» |
| `04-game-countdown.png` | Старт игры | `498:2693` | full-bleed фото, обратный отсчёт, CTA «Cancel» |
| `05-onboarding-1-welcome.png` | Онбординг 1 | `498:2725` | hero, marquee, текстовый блок, пагинация |
| `06-onboarding-1-halloween.png` | Онбординг 1, Halloween-вариант | `498:2795` | promo-палитра (`action-promo`, `bg-marquee-promo`) |
| `07-onboarding-2-how-it-works.png` | Онбординг 2 | `498:2933` | step cards 1–3 |
| `08-onboarding-3-notifications.png` | Онбординг 3 | `498:2864` | CTA «Allow messages», текстовая кнопка «Maybe later» |

Паттерны и их токены: `../ui-kit.md`. Правила: `../UI_RULES.md`.
