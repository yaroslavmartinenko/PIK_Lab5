# GameVault — Gaming Dashboard

Лабораторна робота №5 з курсу Frontend-розробки.  
Веб-застосунок для пошуку та огляду ігор, побудований на React.

## Технології

- **React 19** — функціональні компоненти, хуки (`useState`, `useEffect`)
- **Vite 8** — збірка та dev-сервер
- **Tailwind CSS 4** — стилізація (glassmorphism, dark theme)
- **Lucide React** — іконки

## Функціонал

| Фіча | Опис |
|------|------|
| Hero Section | Банер з featured-грою та кнопкою переходу до деталей |
| Game Grid | Адаптивна сітка з 12 картками ігор |
| Search | Пошук по назві та опису в реальному часі |
| Genre Filter | Фільтрація: All / Action / RPG / Strategy |
| Wishlist | Додавання в обране через ♥, збереження у `localStorage` |
| Game Details | Модальне вікно з повним описом, платформами, тегами |
| Trending | Окрема секція для популярних ігор |

## Структура проєкту

```
src/
├── data/
│   └── games.js              # Mock-дані ігор (12 шт.)
├── components/
│   ├── Header.jsx             # Шапка з пошуковим рядком
│   ├── Sidebar.jsx            # Бічна навігація
│   ├── HeroSection.jsx        # Головний банер
│   ├── SearchBar.jsx          # Фільтр за жанрами
│   ├── GameCard.jsx           # Картка гри
│   └── GameModal.jsx          # Модальне вікно деталей
└── App.jsx                    # Головний компонент
```

## Запуск

```bash
npm install
npm run dev
```

Застосунок відкривається за адресою `http://localhost:5173`

## Підключення реального API

У файлі `src/App.jsx` є готовий коментар для підключення [RAWG API](https://rawg.io/apidocs):

```js
// useEffect(() => {
//   fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}`)
//     .then(r => r.json())
//     .then(data => setGames(data.results))
// }, [])
```

Додайте файл `.env`:

```
VITE_RAWG_KEY=ваш_ключ
```

## Скріншоти

> Dark theme · Glassmorphism картки · Адаптивний дизайн
