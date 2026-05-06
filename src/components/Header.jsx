import { Search, Bell, User, Gamepad2 } from 'lucide-react'

export default function Header({ search, setSearch }) {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 px-6 py-4 border-b border-white/5"
      style={{ background: 'rgba(13,13,18,0.85)', backdropFilter: 'blur(16px)' }}>

      {/* Mobile logo */}
      <div className="flex items-center gap-2 md:hidden mr-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          <Gamepad2 size={14} className="text-white" />
        </div>
        <span className="text-white font-bold tracking-tight">
          Game<span className="text-purple-400">Vault</span>
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 relative max-w-xl">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search games..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none text-gray-200 placeholder-gray-600 transition-all"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all relative">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
        </button>
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
            <User size={12} />
          </div>
          <span className="text-gray-400 hidden sm:block">Guest</span>
        </button>
      </div>
    </header>
  )
}
