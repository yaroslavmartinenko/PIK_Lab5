import { useEffect } from 'react'
import { X, Heart, Star, Calendar, Users, Monitor, Tag } from 'lucide-react'

const GENRE_BADGE = {
  Action: 'badge-action',
  RPG: 'badge-rpg',
  Strategy: 'badge-strategy',
}

export default function GameModal({ game, isFavorite, onToggleFavorite, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #16162a 0%, #0d0d12 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Hero cover */}
        <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl"
          style={{ background: game.gradient }}>

          {/* Grid */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />

          {/* Glow */}
          <div className="absolute inset-0 opacity-25 blur-2xl" style={{ background: game.accentColor }} />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl drop-shadow-2xl select-none">{game.icon}</span>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20"
            style={{ background: 'linear-gradient(to top, #16162a, transparent)' }} />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 z-10"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <X size={16} className="text-gray-300" />
          </button>

          {/* Badges overlay */}
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2 z-10">
            <span className={`badge ${GENRE_BADGE[game.genre] || 'badge-rpg'}`}>{game.genre}</span>
            {game.isNew && <span className="badge text-[10px] px-2.5 py-1"
              style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.35)' }}>NEW</span>}
            {game.isTrending && <span className="badge text-[10px] px-2.5 py-1"
              style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>🔥 TRENDING</span>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{game.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14}
                    className={i < Math.round(game.rating / 2) ? 'rating-star' : 'text-gray-700'}
                    fill={i < Math.round(game.rating / 2) ? '#facc15' : 'none'}
                  />
                ))}
                <span className="text-white font-bold text-sm">{game.rating}</span>
                <span className="text-gray-500 text-sm">/ 10</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-black" style={{ color: game.price === 0 ? '#6ee7b7' : '#fff' }}>
                {game.price === 0 ? 'FREE' : `$${game.price}`}
              </p>
              {game.price > 0 && <p className="text-xs text-gray-500 mt-0.5">One-time purchase</p>}
            </div>
          </div>

          {/* Long description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{game.longDescription}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            <MetaItem icon={<Users size={13} />} label="Developer" value={game.developer} />
            <MetaItem
              icon={<Calendar size={13} />}
              label="Released"
              value={new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            />
            <MetaItem icon={<Monitor size={13} />} label="Platforms" value={game.platform.join(', ')} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Tag size={13} className="text-gray-600 mt-0.5 shrink-0" />
            {game.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-lg text-gray-400"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-95 glow-purple"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              {game.price === 0 ? '⬇ Download Free' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={() => onToggleFavorite(game.id)}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 shrink-0"
              style={isFavorite ? {
                background: 'rgba(239,68,68,0.2)',
                border: '1px solid rgba(239,68,68,0.4)',
              } : {
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18}
                style={{ color: isFavorite ? '#f87171' : '#6b7280' }}
                fill={isFavorite ? '#f87171' : 'none'}
              />
            </button>
          </div>

          {/* Wishlist status */}
          {isFavorite && (
            <p className="text-center text-xs text-red-400 mt-3 flex items-center justify-center gap-1">
              <Heart size={10} fill="#f87171" style={{ color: '#f87171' }} />
              Saved to your Wishlist
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MetaItem({ icon, label, value }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
        {icon}
        <span className="uppercase tracking-wide font-semibold">{label}</span>
      </div>
      <p className="text-gray-200 text-xs font-medium leading-snug">{value}</p>
    </div>
  )
}
