import { rooms, formatPrice, getRoomBySlug } from '../data/rooms.js'

const BOT_USERNAME = 'JokiBot'
const STORAGE_KEY = 'joki_booking'

function nightsBetween(checkIn, checkOut) {
  const a = new Date(checkIn)
  const b = new Date(checkOut)
  const diff = Math.round((b - a) / 86400000)
  return diff > 0 ? diff : 0
}

function generateBookingCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `JOKI-${code}`
}

/** Future FastAPI contract shape */
function buildBookingPayload(form) {
  const room = getRoomBySlug(form.room)
  const nights = nightsBetween(form.checkIn, form.checkOut)
  return {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    code: generateBookingCode(),
    status: 'pending_telegram',
    check_in: form.checkIn,
    check_out: form.checkOut,
    nights,
    room_id: room?.id ?? form.room,
    room_name: room?.name ?? form.room,
    guests_adults: Number(form.adults),
    guests_children: Number(form.children),
    guest_name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    total_estimate: room ? room.priceFrom * Math.max(nights, 1) : null,
    created_at: new Date().toISOString(),
    tg_user_id: null,
    source: 'website_mvp_mock',
  }
}

function telegramDeepLink(code) {
  return `https://t.me/${BOT_USERNAME}?start=booking_${code}`
}

function setError(field, message) {
  const wrap = field.closest('.field')
  if (!wrap) return
  wrap.classList.add('has-error')
  const err = wrap.querySelector('.error')
  if (err) err.textContent = message
}

function clearErrors(formEl) {
  formEl.querySelectorAll('.field').forEach((f) => f.classList.remove('has-error'))
}

export function initBookingWizard() {
  const root = document.querySelector('[data-booking]')
  if (!root) return

  const panels = [...root.querySelectorAll('[data-step]')]
  const labels = [...root.querySelectorAll('[data-step-label]')]
  let step = 0

  const state = {
    checkIn: '',
    checkOut: '',
    room: new URLSearchParams(window.location.search).get('room') || 'honka',
    adults: '2',
    children: '0',
    name: '',
    phone: '',
    email: '',
  }

  const roomList = root.querySelector('[data-room-options]')
  if (roomList) {
    roomList.innerHTML = rooms
      .map(
        (room) => `
      <label class="room-option${state.room === room.slug ? ' is-selected' : ''}" data-room-option="${room.slug}">
        <img src="${room.image}" alt="" loading="lazy" width="88" height="66" />
        <span>
          <strong>${room.name}</strong><br />
          <small>${room.type} · до ${room.capacity} гостей</small>
        </span>
        <span>${formatPrice(room.priceFrom)}</span>
        <input class="sr-only" type="radio" name="room" value="${room.slug}" ${state.room === room.slug ? 'checked' : ''} />
      </label>`,
      )
      .join('')

    roomList.querySelectorAll('[data-room-option]').forEach((option) => {
      option.addEventListener('click', () => {
        state.room = option.dataset.roomOption
        roomList.querySelectorAll('[data-room-option]').forEach((el) => el.classList.remove('is-selected'))
        option.classList.add('is-selected')
        option.querySelector('input').checked = true
      })
    })
  }

  const today = new Date().toISOString().slice(0, 10)
  const checkInInput = root.querySelector('#checkIn')
  const checkOutInput = root.querySelector('#checkOut')
  if (checkInInput) checkInInput.min = today
  if (checkOutInput) checkOutInput.min = today

  checkInInput?.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value || today
  })

  function showStep(index) {
    step = index
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === step))
    labels.forEach((label, i) => {
      label.classList.toggle('is-active', i === step)
      label.classList.toggle('is-done', i < step)
    })
  }

  function readStep0() {
    clearErrors(root)
    state.checkIn = checkInInput.value
    state.checkOut = checkOutInput.value
    let ok = true
    if (!state.checkIn) {
      setError(checkInInput, 'Укажите дату заезда')
      ok = false
    }
    if (!state.checkOut) {
      setError(checkOutInput, 'Укажите дату выезда')
      ok = false
    }
    if (state.checkIn && state.checkOut && nightsBetween(state.checkIn, state.checkOut) < 1) {
      setError(checkOutInput, 'Выезд должен быть позже заезда')
      ok = false
    }
    return ok
  }

  function readStep2() {
    clearErrors(root)
    state.adults = root.querySelector('#adults').value
    state.children = root.querySelector('#children').value
    state.name = root.querySelector('#name').value
    state.phone = root.querySelector('#phone').value
    state.email = root.querySelector('#email').value
    let ok = true
    if (!state.name.trim()) {
      setError(root.querySelector('#name'), 'Введите имя')
      ok = false
    }
    if (!/^\+?[0-9()\-\s]{10,}$/.test(state.phone.trim())) {
      setError(root.querySelector('#phone'), 'Введите телефон')
      ok = false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      setError(root.querySelector('#email'), 'Введите email')
      ok = false
    }
    return ok
  }

  function renderSummary() {
    const room = getRoomBySlug(state.room)
    const nights = nightsBetween(state.checkIn, state.checkOut)
    const total = room ? room.priceFrom * Math.max(nights, 1) : 0
    const box = root.querySelector('[data-summary]')
    if (!box || !room) return
    box.innerHTML = `
      <div><span>Номер</span><strong>${room.name}</strong></div>
      <div><span>Даты</span><strong>${state.checkIn} → ${state.checkOut}</strong></div>
      <div><span>Ночей</span><strong>${nights}</strong></div>
      <div><span>Гости</span><strong>${state.adults} взр.${Number(state.children) ? `, ${state.children} дет.` : ''}</strong></div>
      <div><span>Гость</span><strong>${state.name}</strong></div>
      <div><span>Оценка</span><strong>${formatPrice(total)}</strong></div>
      <p style="margin:0;color:var(--text-soft);font-size:0.85rem">Имитация брони для портфолио. После подтверждения откроется личный кабинет в Telegram-боте.</p>
    `
  }

  root.querySelectorAll('[data-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (step === 0 && !readStep0()) return
      if (step === 2 && !readStep2()) return
      if (step === 2) renderSummary()
      showStep(Math.min(step + 1, panels.length - 1))
    })
  })

  root.querySelectorAll('[data-prev]').forEach((btn) => {
    btn.addEventListener('click', () => showStep(Math.max(step - 1, 0)))
  })

  root.querySelector('[data-submit]')?.addEventListener('click', () => {
    const booking = buildBookingPayload(state)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(booking))
    // Ready for: POST /api/bookings
    window.location.href = `./booking-success.html?code=${encodeURIComponent(booking.code)}`
  })

  showStep(0)
}

export function initSuccessPage() {
  const root = document.querySelector('[data-success]')
  if (!root) return

  const params = new URLSearchParams(window.location.search)
  let booking = null
  try {
    booking = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    booking = null
  }

  const code = params.get('code') || booking?.code || 'JOKI-DEMO'
  if (booking && params.get('code') && booking.code !== params.get('code')) {
    booking = { ...booking, code }
  }

  root.querySelector('[data-code]').textContent = code

  const details = root.querySelector('[data-details]')
  if (details && booking) {
    details.innerHTML = `
      <div><span>Номер</span><strong>${booking.room_name}</strong></div>
      <div><span>Даты</span><strong>${booking.check_in} → ${booking.check_out}</strong></div>
      <div><span>Гость</span><strong>${booking.guest_name}</strong></div>
      <div><span>Статус</span><strong>Ожидает Telegram</strong></div>
    `
  }

  const link = telegramDeepLink(code)
  const cta = root.querySelector('[data-tg-link]')
  if (cta) {
    cta.href = link
  }

  const hint = root.querySelector('[data-tg-hint]')
  if (hint) {
    hint.textContent = `Deep-link: t.me/${BOT_USERNAME}?start=booking_${code}`
  }
}

export { formatPrice, rooms, getRoomBySlug }
