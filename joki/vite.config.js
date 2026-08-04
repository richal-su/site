import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    host: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        rooms: resolve(root, 'rooms/index.html'),
        honka: resolve(root, 'rooms/honka.html'),
        usva: resolve(root, 'rooms/usva.html'),
        lampi: resolve(root, 'rooms/lampi.html'),
        services: resolve(root, 'services.html'),
        offers: resolve(root, 'offers.html'),
        reviews: resolve(root, 'reviews.html'),
        faq: resolve(root, 'faq.html'),
        contacts: resolve(root, 'contacts.html'),
        booking: resolve(root, 'booking.html'),
        bookingSuccess: resolve(root, 'booking-success.html'),
        caseStudy: resolve(root, 'case.html'),
      },
    },
  },
})
