const RIVER_ICON = `
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M3 8.5c2.2-2 4.4-2 6.5 0s4.4 2 6.5 0 4.4-2 6.5 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M3 12.5c2.2-2 4.4-2 6.5 0s4.4 2 6.5 0 4.4-2 6.5 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M3 16.5c2.2-2 4.4-2 6.5 0s4.4 2 6.5 0 4.4-2 6.5 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
</svg>`

function pathPrefix() {
  const depth = window.location.pathname.split('/').filter(Boolean).length
  // rooms/*.html => one level deeper than root pages
  if (window.location.pathname.includes('/rooms/') && !window.location.pathname.endsWith('/rooms/') && !window.location.pathname.endsWith('/rooms/index.html')) {
    return '../'
  }
  if (window.location.pathname.endsWith('/rooms/') || window.location.pathname.endsWith('/rooms/index.html')) {
    return '../'
  }
  return './'
}

export function initLayout({ darkHero = false } = {}) {
  const base = pathPrefix()
  const current = window.location.pathname

  const links = [
    { href: `${base}index.html`, label: 'Главная', match: /\/(index\.html)?$/ },
    { href: `${base}rooms/index.html`, label: 'Номера', match: /\/rooms\// },
    { href: `${base}services.html`, label: 'Услуги', match: /services\.html$/ },
    { href: `${base}offers.html`, label: 'Акции', match: /offers\.html$/ },
    { href: `${base}reviews.html`, label: 'Отзывы', match: /reviews\.html$/ },
    { href: `${base}faq.html`, label: 'FAQ', match: /faq\.html$/ },
    { href: `${base}contacts.html`, label: 'Контакты', match: /contacts\.html$/ },
  ]

  const header = document.createElement('header')
  header.className = `site-header${darkHero ? ' on-dark' : ''}`
  header.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="${base}index.html" aria-label="Йоки — на главную">
        <span class="brand-mark">${RIVER_ICON}</span>
        <span class="brand-name">Йоки</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false">
        <span></span>
      </button>
      <nav class="nav" data-nav>
        ${links
          .map((link) => {
            const active = link.match.test(current) ? ' is-active' : ''
            return `<a class="nav-link${active}" href="${link.href}">${link.label}</a>`
          })
          .join('')}
        <a class="btn btn-primary nav-cta" href="${base}booking.html">Забронировать</a>
      </nav>
    </div>
  `

  const footer = document.createElement('footer')
  footer.className = 'site-footer'
  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <span class="brand-mark">${RIVER_ICON}</span>
          <span class="brand-name">Йоки</span>
        </div>
        <p>Эко-отель у реки в Карелии. Хвойный лес, туманные утра и тихий берег.</p>
      </div>
      <div class="footer-col">
        <h3>Навигация</h3>
        <ul>
          <li><a href="${base}rooms/index.html">Номера</a></li>
          <li><a href="${base}services.html">Услуги</a></li>
          <li><a href="${base}offers.html">Акции</a></li>
          <li><a href="${base}booking.html">Бронирование</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Контакты</h3>
        <ul>
          <li>Респ. Карелия, берег реки Шуя</li>
          <li><a href="tel:+78122990011">+7 (812) 299-00-11</a></li>
          <li><a href="mailto:stay@joki.hotel">stay@joki.hotel</a></li>
          <li><a href="${base}case.html">Кейс проекта</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© ${new Date().getFullYear()} Йоки. Вымышленный отель для портфолио.</span>
      <span>Подготовка к Telegram-боту бронирования</span>
    </div>
  `

  document.body.prepend(header)
  document.body.append(footer)

  const toggle = header.querySelector('.menu-toggle')
  const nav = header.querySelector('[data-nav]')
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню')
    document.body.style.overflow = open ? 'hidden' : ''
  })

  nav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open')
      toggle?.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    })
  })

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

export function initReveal() {
  const nodes = document.querySelectorAll('.reveal')
  if (!nodes.length) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('is-visible'))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )

  nodes.forEach((node) => io.observe(node))
}

export function initFaq() {
  document.querySelectorAll('.faq-item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item')
      const open = item.classList.toggle('is-open')
      btn.setAttribute('aria-expanded', String(open))
    })
  })
}
