import { Heart, Star, Eye } from 'lucide-react'

const GENRE_BADGE = {
  Action: 'badge-action',
  RPG: 'badge-rpg',
  Strategy: 'badge-strategy',
}

export default function GameCard({ game, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      className="glass glass-hover card-shine rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Cover */}
      <div className="relative h-40 overflow-hidden" style={{ background: game.gradient }}>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

        {/* Glow */}
        <div className="absolute inset-0 opacity-20 blur-xl"
          style={{ background: game.accentColor }} />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl drop-shadow-lg select-none">{game.icon}</span>
        </div>

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {game.isNew && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.35)' }}>
              NEW
            </span>
          )}
          {game.isTrending && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
              🔥 HOT
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          style={{
            background: isFavorite ? 'rgba(239,68,68,0.25)' : 'rgba(0,0,0,0.4)',
            border: isFavorite ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={e => { e.stopPropagation(); onToggleFavorite(game.id) }}
          title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14}
            className="transition-colors"
            style={{ color: isFavorite ? '#f87171' : '#9ca3af' }}
            fill={isFavorite ? '#f87171' : 'none'}
          />
        </button>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Genre + rating */}
        <div className="flex items-center justify-between">
          <span className={`badge ${GENRE_BADGE[game.genre] || 'badge-rpg'}`}>{game.genre}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="rating-star" fill="#facc15" />
            <span className="text-sm font-bold text-white">{game.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base leading-tight line-clamp-1">{game.title}</h3>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">{game.description}</p>

        {/* Platform tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {game.platform.slice(0, 3).map(p => (
            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded text-gray-500"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              {p}
            </span>
          ))}
          {game.platform.length > 3 && (
            <span className="text-[10px] text-gray-600">+{game.platform.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1">
          <span className="text-sm font-bold text-white">
            {game.price === 0 ? (
              <span style={{ color: '#6ee7b7' }}>Free</span>
            ) : (
              `$${game.price}`
            )}
          </span>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-300 transition-all hover:text-white"
            style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
            onClick={e => { e.stopPropagation(); onClick() }}
          >
            <Eye size={12} />
            Details
          </button>
        </div>
      </div>
    </div>
  )
}
