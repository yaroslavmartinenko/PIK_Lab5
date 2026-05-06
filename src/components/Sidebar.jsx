import { Compass, Heart, Flame, Settings, Gamepad2 } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'trending', label: 'Trending', icon: Flame },
]

export default function Sidebar({ activeSection, setActiveSection, favoritesCount }) {
  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen py-6 px-3 border-r border-white/5"
      style={{ background: 'rgba(13,13,18,0.95)' }}>

      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          <Gamepad2 size={16} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          Game<span className="text-purple-400">Vault</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest px-3 mb-2">Menu</p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`sidebar-item${activeSection === id ? ' active' : ''}`}
          >
            <Icon size={16} />
            <span>{label}</span>
            {id === 'wishlist' && favoritesCount > 0 && (
              <span className="ml-auto text-xs bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <button className="sidebar-item w-full">
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <div className="mt-4 mx-3 p-3 rounded-xl text-center"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
          <p className="text-xs text-purple-300 font-medium">Logged as Guest</p>
          <p className="text-[11px] text-gray-500 mt-1">Sign in for cloud sync</p>
        </div>
      </div>
    </aside>
  )
}
