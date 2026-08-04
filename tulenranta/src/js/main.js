import '../styles/main.scss'
import { initLayout, initReveal, initFaq } from './layout.js'
import { initBookingWizard, initSuccessPage, rooms, formatPrice } from './booking.js'
import { reviews } from '../data/reviews.js'

const page = document.body.dataset.page

initLayout({
  darkHero: ['home', 'room'].includes(page),
})

if (page === 'home' || page === 'rooms') {
  const grid = document.querySelector('[data-rooms]')
  if (grid) {
    const roomBase = page === 'rooms' ? './' : './rooms/'
    grid.innerHTML = rooms
      .map(
        (room, index) => `
      <a class="room-card reveal reveal-delay-${index}" href="${roomBase}${room.slug}.html">
        <div class="room-card-media">
          <img src="${room.image}" alt="Номер ${room.name}" loading="${index === 0 ? 'eager' : 'lazy'}" width="640" height="800" />
          <span class="room-card-badge">${room.type}</span>
        </div>
        <div class="room-card-body">
          <h3>${room.name}</h3>
          <p>${room.tagline}</p>
          <div class="room-card-meta">
            <span>до ${room.capacity} гостей</span>
            <span>${room.area} м²</span>
          </div>
          <div class="room-card-footer">
            <div class="price">от ${formatPrice(room.priceFrom)}<span>за ночь</span></div>
            <span class="btn btn-glass">Смотреть</span>
          </div>
        </div>
      </a>`,
      )
      .join('')
  }
}

if (page === 'home' || page === 'reviews') {
  const list = document.querySelector('[data-reviews]')
  if (list) {
    const items = page === 'home' ? reviews.slice(0, 2) : reviews
    list.innerHTML = items
      .map(
        (review) => `
      <article class="review reveal">
        <div class="review-top">
          <img src="${review.avatar}" alt="" width="48" height="48" loading="lazy" />
          <div>
            <strong>${review.name}</strong>
            <span>${review.trip}</span>
          </div>
        </div>
        <div class="stars" aria-label="Оценка ${review.rating} из 5">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        <p>${review.text}</p>
      </article>`,
      )
      .join('')
  }
}

if (page === 'booking') initBookingWizard()
if (page === 'success') initSuccessPage()
if (page === 'faq') initFaq()

initReveal()
