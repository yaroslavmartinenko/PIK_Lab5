import { GENRES } from '../data/games'

const GENRE_COLORS = {
  All: { active: '#7c3aed', bg: 'rgba(124,58,237,0.2)', border: 'rgba(124,58,237,0.4)' },
  Action: { active: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.35)' },
  RPG: { active: '#a855f7', bg: 'rgba(168,85,247,0.2)', border: 'rgba(168,85,247,0.4)' },
  Strategy: { active: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.35)' },
}

export default function SearchBar({ selectedGenre, setSelectedGenre, resultCount }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Genre filters */}
      <div className="flex flex-wrap gap-2">
        {GENRES.map(genre => {
          const isActive = selectedGenre === genre
          const colors = GENRE_COLORS[genre]
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={isActive ? {
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.active,
                boxShadow: `0 0 12px ${colors.active}25`,
              } : {
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#9ca3af',
              }}
            >
              {genre}
            </button>
          )
        })}
      </div>

      {/* Count */}
      {resultCount !== undefined && (
        <p className="text-sm text-gray-500 shrink-0">
          <span className="text-gray-300 font-medium">{resultCount}</span>{' '}
          {resultCount === 1 ? 'game' : 'games'} found
        </p>
      )}
    </div>
  )
}
