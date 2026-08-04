export const rooms = [
  {
    id: 'honka',
    slug: 'honka',
    name: 'Хонка',
    nameFi: 'Honka',
    tagline: 'Сосновый кокон для двоих',
    type: 'Для пар',
    capacity: 2,
    area: 28,
    priceFrom: 8900,
    image: '/images/room-honka.jpg',
    gallery: ['/images/room-honka.jpg', '/images/bedroom.jpg', '/images/forest-path.jpg'],
    description:
      'Номер в окружении вековых сосен. Тёплый свет, дерево, панорамное окно во двор отеля — место, где хочется замедлиться вдвоём.',
    amenities: [
      'Кровать king-size',
      'Панорамное окно',
      'Собственная сауна-мини',
      'Чайный уголок',
      'Халаты и тапочки',
      'Wi-Fi',
    ],
  },
  {
    id: 'usva',
    slug: 'usva',
    name: 'Усва',
    nameFi: 'Usva',
    tagline: 'Семейный дом в тумане леса',
    type: 'Для семьи',
    capacity: 4,
    area: 46,
    priceFrom: 12900,
    image: '/images/room-usva.jpg',
    gallery: ['/images/room-usva.jpg', '/images/room-alt.jpg', '/images/pine-mist.jpg'],
    description:
      'Просторный номер для семьи: две зоны сна, игровая ниша для детей и вид на хвойный склон. Утва — «туман» по-фински: утро здесь начинается мягко.',
    amenities: [
      'До 4 гостей',
      'Отдельная детская зона',
      'Семейная ванна',
      'Мини-кухня',
      'Настольные игры',
      'Wi-Fi',
    ],
  },
  {
    id: 'lampi',
    slug: 'lampi',
    name: 'Лампи',
    nameFi: 'Lampi',
    tagline: 'У воды, у костра, у тишины',
    type: 'У озера',
    capacity: 2,
    area: 38,
    priceFrom: 15900,
    image: '/images/room-lampi.jpg',
    gallery: ['/images/room-lampi.jpg', '/images/atmosphere-lake.jpg', '/images/campfire.jpg'],
    description:
      'Премиальный номер у кромки озера. Терраса с костровой чашей, закаты над водой и приватность — для тех, кто едет за настоящей Карелией.',
    amenities: [
      'Терраса у воды',
      'Костровая чаша',
      'Ванна с видом',
      'Камин',
      'Завтрак в номер',
      'Wi-Fi',
    ],
  },
]

export function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

export function getRoomBySlug(slug) {
  return rooms.find((room) => room.slug === slug)
}
