# GameVault — Gaming Dashboard

> Лабораторна робота №5 · Курс «Розробка інтерфейсів користувача»  
> Київський національний університет імені Тараса Шевченка

Веб-застосунок для пошуку та огляду ігор із темною геймерською естетикою, побудований на React + Tailwind CSS.

---

## Технічний стек

| Технологія | Версія | Призначення |
|---|---|---|
| React | 19 | UI-бібліотека, функціональні компоненти, хуки |
| Vite | 8 | Збірка та dev-сервер |
| Tailwind CSS | 4 | Стилізація, адаптивний дизайн |
| Lucide React | latest | Іконки |

## Функціонал

- **Hero Section** — анімований банер із featured-грою, glow-ефекти та градієнтний фон
- **Game Grid** — адаптивна сітка карток (1→2→3→4 колонки) з 12 іграми
- **Пошук** — фільтрація каталогу за назвою та описом у реальному часі
- **Фільтр жанрів** — All / Action / RPG / Strategy
- **Wishlist** — додавання ігор в обране через ♥, збереження у `localStorage`
- **Game Modal** — модальне вікно з детальним описом, платформами, тегами та ціною (закривається на ESC або кліком поза вікном)
- **Trending** — окрема секція для популярних ігор
- **Glassmorphism** — напівпрозорі картки з backdrop-blur та shine-ефектом при наведенні

## Структура компонентів

```
src/
├── data/
│   └── games.js          # Mock-дані 12 ігор + масив жанрів
├── components/
│   ├── Header.jsx         # Шапка з пошуковим рядком і аватаром
│   ├── Sidebar.jsx        # Бічна навігація (Discover / Wishlist / Trending)
│   ├── HeroSection.jsx    # Головний банер із featured-грою
│   ├── SearchBar.jsx      # Кнопки фільтрації за жанрами + лічильник
│   ├── GameCard.jsx       # Картка гри з glassmorphism-ефектом
│   └── GameModal.jsx      # Модальне вікно з деталями
└── App.jsx                # Кореневий компонент, глобальний стан
```

## Запуск проєкту

```bash
# Встановити залежності
npm install

# Запустити dev-сервер
npm run dev
# → http://localhost:5173

# Зібрати production-build
npm run build
```

## Підключення реального API

У файлі `src/App.jsx` є готовий коментар для підключення [RAWG API](https://rawg.io/apidocs):

```js
// useEffect(() => {
//   fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}`)
//     .then(r => r.json())
//     .then(data => setGames(data.results))
// }, [])
```

Створіть файл `.env` у корені проєкту:

```env
VITE_RAWG_KEY=ваш_ключ_тут
```
