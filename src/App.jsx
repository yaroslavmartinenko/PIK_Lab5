import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import HeroSection from './components/HeroSection'
import GameCard from './components/GameCard'
import SearchBar from './components/SearchBar'
import GameModal from './components/GameModal'
import { GAMES } from './data/games'

// --- API integration point ---
// Replace the GAMES import with a real API call, e.g.:
//   useEffect(() => {
//     fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}`)
//       .then(r => r.json())
//       .then(data => setGames(data.results))
//   }, [])

export default function App() {
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [selectedGame, setSelectedGame] = useState(null)
  const [activeSection, setActiveSection] = useState('discover')

  // Favorites persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('gameVault_favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('gameVault_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (gameId) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    )
  }

  const heroGame = GAMES.find(g => g.hero)

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.description.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre
    const matchesSection = activeSection === 'wishlist' ? favorites.includes(game.id) :
      activeSection === 'trending' ? game.isTrending : true
    return matchesSearch && matchesGenre && matchesSection
  })

  const sectionTitle = {
    discover: 'All Games',
    wishlist: 'My Wishlist',
    trending: 'Trending Now',
  }[activeSection] ?? 'Games'

  return (
    <div className="min-h-screen flex" style={{ background: '#0d0d12' }}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        favoritesCount={favorites.length}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header search={search} setSearch={setSearch} />

        <main className="flex-1 p-4 sm:p-6 max-w-screen-xl mx-auto w-full">

          {/* Hero — only in discover section */}
          {activeSection === 'discover' && !search && heroGame && (
            <HeroSection game={heroGame} onPlay={() => setSelectedGame(heroGame)} />
          )}

          {/* Section heading */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              {sectionTitle}
              {activeSection === 'wishlist' && favorites.length === 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">— nothing saved yet</span>
              )}
            </h2>
          </div>

          {/* Filters */}
          <SearchBar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            resultCount={filteredGames.length}
          />

          {/* Empty state */}
          {filteredGames.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">
                {activeSection === 'wishlist' ? '💔' : '🎮'}
              </span>
              <p className="text-gray-400 font-medium text-lg">
                {activeSection === 'wishlist'
                  ? 'Your wishlist is empty'
                  : 'No games found'}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {activeSection === 'wishlist'
                  ? 'Click the ♥ on any game to save it here'
                  : 'Try a different search or genre'}
              </p>
            </div>
          )}

          {/* Game grid */}
          {filteredGames.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
              {filteredGames.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => setSelectedGame(game)}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pb-6 text-center text-xs text-gray-700">
            GameVault · Lab 5 · React + Tailwind CSS
          </footer>
        </main>
      </div>

      {/* Game detail modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          isFavorite={favorites.includes(selectedGame.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  )
}
