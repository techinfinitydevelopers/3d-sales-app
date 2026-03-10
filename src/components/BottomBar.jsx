import { MapPin, Volume2, Maximize2, Home, PanelLeftClose, PanelLeftOpen, Info } from 'lucide-react'

export default function BottomBar({ sidebarOpen, toggleSidebar, fullscreen, toggleFullscreen, setActiveView }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center px-4 gap-1 bg-gradient-to-t from-stone-950/70 to-transparent z-30 pointer-events-none">
      <div className="flex items-center gap-1 pointer-events-auto">
        <button
          onClick={toggleSidebar}
          className="text-stone-400 hover:text-white transition-colors p-2 rounded"
          title="Toggle Sidebar"
        >
          {sidebarOpen ? <PanelLeftClose size={17} strokeWidth={1.5} /> : <PanelLeftOpen size={17} strokeWidth={1.5} />}
        </button>

        <button
          onClick={() => setActiveView('locations')}
          className="text-stone-400 hover:text-white transition-colors p-2 rounded"
          title="Location"
        >
          <MapPin size={17} strokeWidth={1.5} />
        </button>

        <button
          className="text-stone-400 hover:text-white transition-colors p-2 rounded"
          title="Sound"
        >
          <Volume2 size={17} strokeWidth={1.5} />
        </button>

        <button
          onClick={toggleFullscreen}
          className="text-stone-400 hover:text-white transition-colors p-2 rounded"
          title="Fullscreen"
        >
          <Maximize2 size={17} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => setActiveView('exterior')}
          className="text-stone-400 hover:text-white transition-colors p-2 rounded"
          title="Home"
        >
          <Home size={17} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
