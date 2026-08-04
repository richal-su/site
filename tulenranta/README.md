# Туленранта

Эко-отель у озера в Карелии — портфолио-проект №1 (сайт).

**Туленранта** = фин. *tuli* (огонь/костёр) + *ranta* (берег).

## Стек

- Vite + HTML / SCSS / JavaScript
- Имитация бронирования → deep-link в Telegram
- Подготовка к FastAPI + боту (этап 2)

## Запуск

```bash
cd tulenranta
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Страницы

- `/` — главная
- `/rooms/` — каталог номеров (Хонка, Усва, Лампи)
- `/services.html`, `/offers.html`, `/reviews.html`, `/faq.html`, `/contacts.html`
- `/booking.html` → `/booking-success.html` → Telegram deep-link
- `/case.html` — кейс для портфолио

## Telegram (контракт)

После брони:

`https://t.me/TulenrantaBot?start=booking_<CODE>`

Payload брони сохраняется в `localStorage` (`tulenranta_booking`) в формате, совместимом с будущим `POST /api/bookings`.
