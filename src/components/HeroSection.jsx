import { Play, Star, ChevronRight } from 'lucide-react'

export default function HeroSection({ game, onPlay }) {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 cursor-pointer group"
      style={{ minHeight: 280 }}
      onClick={onPlay}>

      {/* Background */}
      <div className="absolute inset-0" style={{ background: game.gradient }} />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      {/* Glow orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
        style={{ background: game.accentColor }} />
      <div className="absolute -bottom-10 left-20 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ background: game.accentColor }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between p-6 sm:p-8 h-full"
        style={{ minHeight: 280 }}>
        <div className="flex-1">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${game.accentColor}40`,
                color: game.accentColor,
                backdropFilter: 'blur(8px)',
              }}>
              ⭐ FEATURED
            </span>
            <span className="badge badge-rpg">{game.genre}</span>
            {game.isTrending && (
              <span className="badge text-xs px-3 py-1 rounded-full"
                style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
                🔥 TRENDING
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 leading-tight tracking-tight text-glow">
            {game.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14}
                className={i < Math.round(game.rating / 2) ? 'rating-star' : 'text-gray-600'}
                fill={i < Math.round(game.rating / 2) ? '#facc15' : 'none'}
              />
            ))}
            <span className="text-white font-bold ml-1">{game.rating}</span>
            <span className="text-gray-400 text-sm">/ 10</span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base max-w-lg leading-relaxed">
            {game.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {game.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded text-gray-400"
                style={{ background: 'rgba(255,255,255,0.07)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 mt-6 sm:mt-0 sm:ml-8 shrink-0">
          <div className="text-center mb-1">
            <span className="text-3xl">{game.icon}</span>
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 glow-purple"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            onClick={e => { e.stopPropagation(); onPlay() }}
          >
            <Play size={16} fill="white" />
            View Details
          </button>
          <p className="text-center text-xs text-gray-500">
            {game.developer} · {new Date(game.releaseDate).getFullYear()}
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${game.accentColor}50, transparent)` }} />

      {/* Hover arrow */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
        <ChevronRight size={24} className="text-white" />
      </div>
    </div>
  )
}
