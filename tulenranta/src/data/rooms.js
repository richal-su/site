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
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80',
    ],
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
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1400&q=80',
    ],
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
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    ],
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
