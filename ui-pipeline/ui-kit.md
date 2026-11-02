# UI Kit Hela (v0.1)

Список паттернов, из которых собираются экраны Hela. Источник: Figma «DE», секция «App» (8 экранов).
Значения везде через токены из `hela-app/app/tokens.css`. Размеры в px даны как в макете при ширине 390; в приложении ширина гибкая (раздел 1).

**Правило для агента.** Нужного паттерна здесь нет: стоп, спроси. Не изобретай. Состояния hover / pressed / disabled /
loading / empty / error в макетах **не нарисованы** (только default): спрашивай, не придумывай (см. «Чего нет в макетах»).

**Не строить (хром Telegram / iOS):** шапка «Helabet Simulator / mini app», кнопки X и «…», статус-бар, Modal Stack,
Header (iOS). Верхний отступ задаётся safe area (раздел 1), а не числом из макета.

## 1. Каркас экрана и Telegram WebView
Hela это **Telegram Mini App**: наш код работает в WebView внутри Telegram. Макет показывает его в Telegram целиком: рамка телефона
390 × 984 со скруглением 44, статус-бар, шапка «Helabet Simulator / mini app» с кнопками X и «…». **Рамка и шапка принадлежат
Telegram и iOS, не нам.** Цифры рамки это свойства макета, а не приложения.

| В макете | В приложении |
|---|---|
| Ширина 390 | Гибкая. Проектируем на 390, проверяем 360 и 430. Поля `--screen-gutter` (20) слева и справа, контент тянется (350 в макете это 390 − 2×20). |
| Высота 984 / 854 | Высота WebView: `var(--app-height)` (= `--tg-viewport-stable-height` с запасным `100dvh`). Не `100vh`, не фиксированные px. |
| Отступ сверху ~130 | Не числом. Шапку рисует Telegram. Верх по safe area: `var(--safe-top)` (Telegram safe area + content safe area; важно в полноэкранном режиме). |
| Низ: плавающий таббар, CTA | Отступ снизу с учётом `var(--safe-bottom)`. Боковые: `var(--safe-left)`, `var(--safe-right)`. |
| Скругление 44, статус-бар, Home Indicator | Рисует Telegram / iOS. |
| Цвета хрома (#2a2a2a, #aaaaaa; в Figma переменные `text_color`, `subtitle_text_color`) | ThemeParams Telegram, не токены Hela. Наш дизайн от темы Telegram не зависит: палитра тёмная и зафиксирована. |

- Интерфейс только для касаний: не опираться на hover и на курсор.
- Не полагаться на системный жест «вниз закрывает» и вертикальные свайпы: `disableVerticalSwipes()` (Bot API 7.7+), решение за продуктом.
- Цвет шапки, фона и нижней панели Telegram задаётся из кода: `setHeaderColor`, `setBackgroundColor` (6.1+), `setBottomBarColor` (7.10+). Нужно ли подгонять их под `--bg-hero`, не решено.
- Вертикальный ритм карточек на главном: 12 (`--space-xl`). Внутри карточки отступ 16 (`--space-2xl`).
- **px → токен.** Отступы: 2 `--space-2xs`, 4 `--space-xs`, 6 `--space-sm`, 8 `--space-md`, 10 `--space-lg`, 12 `--space-xl`, 16 `--space-2xl`, 20 `--space-3xl`, 24 `--space-4xl`, 32 `--space-5xl`. Радиусы: 4 `--round-4`, 8 `--round-8`, 24 `--round-card`, 32 `--round-32`, пилюля/круг `--round-full`.
- Ближайшие компоненты в коде (`hela-app/components/ui`): badge, button, card, progress, carousel, item, avatar. Они стандартные shadcn, под Hela их нужно подгонять.
- **Состояние кода:** Telegram SDK подключён (`app/layout.tsx` грузит `telegram-web-app.js`, `components/telegram-provider.tsx` вызывает `ready()` и `expand()`, типы в `types/telegram-web-app.d.ts`, помощники в `lib/telegram.ts`). Переменные `--app-height`, `--safe-top`, `--safe-bottom`, `--safe-left`, `--safe-right` объявлены в `globals.css`. Но экраны пока их не используют: `/tg` рисует поддельную шапку для превью, а `/`, `/helabet`, `/contacts` стоят в жёсткой рамке 390 × 844 (симулятор макетов).

## 2. Паттерны

### 2.1 Chip (чип)
Высота 30, отступы 8 / 12, gap 6, радиус `--round-full`, заливка `--surface-glass`, эффект Glass, текст 12/600 `--text-primary`.
- **Текстовый:** «3 days» (иконка пламени 14 + текст), «LVL 10» (молния 10×14 + текст).
- **Два значения:** «Rank bonus ×1.15», gap 10; значение акцентом `--text-accent`.
- **Иконочный:** 30 × 30, иконка 16 (флаг, меню).
- **Число шага:** 30 × 30 с цифрой 12/600 (см. 2.12).

### 2.2 Баланс (шапка главного)
Монета-аватар 32 (круг) + «999,99» 14/700 `--text-accent`. Строка шапки 350 × 32, три группы по краям: баланс, чип «3 days», иконочные чипы (флаг, меню).

### 2.3 Button (CTA)
350 × 50, `--round-full`, отступы 16 / 20, текст 17/500 `--text-primary` по центру. Высота `--button-h`.
Слои в макете: белая подложка + цветной tint + эффект Glass + тень (библиотечный компонент iOS «Liquid Glass»).
- **primary:** tint `--action-primary`. Основной вариант (Get Started, Sounds good, Go to Bets, Cancel, Activate 2X Boost на главном).
- **promo:** tint `--action-promo`. Встречается на Scroll (Activate 2X Boost), Halloween и в Allow messages.
- **text button:** без фона, 17/500 белый, под основной CTA («Maybe later»), gap 16.

### 2.4 Hero card
350 × 300, `--round-32`, фон `--bg-hero-deep`, картинка на всю карточку. Снизу скрим 80 px: `--scrim-bottom` + размытие `--glass-blur-md`.
Внизу ряд чипов 350 × 30 с отступом по бокам 14, space-between: слева «Rank bonus ×1.15», справа «LVL 10».

### 2.5 Glass card (базовая карточка)
350 ширина, отступ 16, `--round-card` (24), заливка `--surface-glass-strong`, эффект Glass. Внутри всё через gap 10–14.

### 2.6 Streak Calendar
Glass card 350 × 111. Сверху декоративное золотое свечение (`--accent-gold`, размытие `--glow-blur-sm`).
Заголовок «Streak Calendar» 15/600. Ряд из 7 колонок space-between (318): ячейка 30 × 30 + gap 4 + буква дня (M T W T F S S) 11/600.
- **Активный день:** ячейка `--gradient-gold`, внутри пламя 21 × 22, буква `--text-primary`.
- **Неактивный:** ячейка `--surface-glass`, буква `--text-secondary`.
- Между соседними активными днями на скрине есть короткие линии-соединители.

### 2.7 Career card
350 × 155, отступ 16, gap 12, `--round-card`, заливка `--gradient-card`. Три блока:
1. Шапка: подпись «YOUR CAREER» 11/600 `--text-secondary` (капс, `--ls-caps`) над строкой «Runner» 24/700 + чип «LVL 10». Справа стрелка-шеврон (цвет `--text-primary`).
2. Прогресс: трек 231 × 4 `--progress-track` и заливка `--gradient-progress`, оба `--round-full`; справа «78 / 200 XP» 13/500 `--text-secondary`, gap 16.
3. Чип успеха: отступы 3 / 8, `--round-8`, заливка `--gradient-success-chip`, иконка 11 + текст 13/500 `--text-success` («Top 12% of runners this week»).

### 2.8 Promo tile (карусель плиток)
180 × 100, отступ 16, `--round-card`, картинка, снизу скрим 36 px (`--scrim-bottom` + размытие `--glass-blur-md`).
Подпись: заголовок 15/700 над строкой 11/400 + иконка монеты 13 × 16.
Заливки: Invite & Earn `--gradient-tile-green`, Daily Reward `--gradient-tile-gold`, нейтральная `--surface-glass`.
Плитки идут в горизонтальной ленте с gap 12, лента шире экрана (скролл).

### 2.9 Stat card
350 × 94, отступ 16, `--round-card`, заливка `--gradient-card`. Ряд из трёх статов, gap 32. Стат: число 32/700 `--text-primary` над подписью 11/400 `--text-secondary`, gap 8. («Shifts», «Bets won», «Spins»)

### 2.10 Tab bar
Плавающий, по центру внизу, 260 × 74, отступ 4, gap 8, `--round-full`, заливка `--surface-tabbar-tint`, обводка 1 `--border-default`.
Пункты (Work, Bet, Play): колонка gap 4, отступы 10 / 6, иконка 24 + подпись 12/600 `--text-primary`.
Активный пункт: заливка `--surface-tab-active` + Glass; остальные без фона.

### 2.11 Pagination dots
Ряд 56 × 8, gap 8. Активная: пилюля 24 × 8 `--dot-active` (золото). Неактивные: круг 8 × 8 `--dot-inactive`.

### 2.12 Step card («How Hela works»)
Glass card 350 × 88, отступ 16. Ряд gap 16: чип-число 30 × 30 + колонка gap 4: строка (иконка 20 + заголовок 17/700, gap 8) и описание 13/500 `--text-secondary` (2 строки). Список карточек gap 8.
Сноска под списком: иконка монеты + «Hela Coins – your in-app currency.» 12/400 `--text-secondary`.

### 2.13 Онбординг: шапка с маскотом
Слой `--bg-app` 390 × 854, сверху зона 390 × 400–440 фона `--bg-hero`, в ней маскот (≈180 × 180), два размытых свечения `--glow-purple` (168 × 82, `--glow-blur-lg`), блёстки. Под маскотом ряд рейтинга: 5 звёзд 15 × 15 (заливка `--gradient-star`, неактивная `--star-inactive`) + «5.0» 16/400.
**Лента hela.bet:** на всю ширину 390 × 30, фон `--bg-marquee` (промо-состояние `--bg-marquee-promo`), логотипы и белые точки 3.7 с gap 15.

### 2.14 Онбординг: текстовый блок
Ширина ~262, gap 6. Заголовок 34/700 (заливка `--gradient-heading`, на «How Hela works» белый), под ним текст 16/500 `--text-secondary`. Ниже pagination dots (2.11) и CTA (2.3) внизу.

### 2.15 Полноэкранный экран с фото («Waiting for shift», «Game starts in»)
Фото на весь экран 390 × 862, снизу скрим 297 px (`--scrim-bottom`). Заголовок 34/700 `--gradient-heading` и под ним крупное число 64/700 `--text-primary` («00:15», «3..2..1»). Внизу CTA primary («Go to Bets», «Cancel»).

## 3. Типографика (роли → токены)
Шрифт всегда `--font-ui` (Plus Jakarta Sans).
| Роль | Размер / вес | Токены | Где |
|---|---|---|---|
| Отсчёт | 64/700 | `--fs-64` `--fw-bold` | «00:15», «3..2..1» |
| Заголовок экрана | 34/700 | `--fs-34` `--fw-bold` + `--gradient-heading` | онбординг, ожидание |
| Число статы | 32/700 | `--fs-32` `--fw-bold` | Stat card |
| Заголовок блока | 24/700 | `--fs-24` `--fw-bold` | «Runner» |
| Кнопка, заголовок шага | 17/500, 17/700 | `--fs-17` | CTA, Step card |
| Описание онбординга | 16/500 | `--fs-16` `--fw-medium` | под заголовком |
| Заголовок карточки | 15/600, 15/700 | `--fs-15` | Streak, плитки |
| Баланс | 14/700 | `--fs-14` | шапка |
| Описание шага, прогресс | 13/500 | `--fs-13` `--fw-medium` | Step card, XP |
| Чип, таб | 12/600 | `--fs-12` `--fw-semibold` | чипы, таббар |
| Подпись, капс | 11/600 (капс `--ls-caps`), 11/400 | `--fs-11` | дни, «YOUR CAREER», подписи |

## 4. Чего нет в макетах (спрашивать, не придумывать)
- Состояния hover / pressed / disabled / loading / empty / error ни у одного компонента.
- Тёмная и светлая темы: только тёмная.
- Планшет и десктоп: только 390 px.
- Состояния таббара кроме «Work активен», пустой стрик, нулевой баланс, длинные значения.
