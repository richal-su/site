# Йоки

Эко-отель у реки в Карелии — портфолио-проект №1 (сайт).

**Йоки** = фин. *joki* («река»).

## Стек

- Vite + HTML / SCSS / JavaScript
- Имитация бронирования → deep-link в Telegram
- Подготовка к FastAPI + боту (этап 2)

## Запуск

```bash
cd joki
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

`https://t.me/JokiBot?start=booking_<CODE>`

Payload брони сохраняется в `localStorage` (`joki_booking`) в формате, совместимом с будущим `POST /api/bookings`.
