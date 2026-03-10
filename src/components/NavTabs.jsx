import { RotateCcw, MapPin, LayoutGrid, Image, Building2 } from 'lucide-react'

const tabs = [
  { id: 'exterior', icon: RotateCcw, label: 'Views' },
  { id: 'locations', icon: MapPin, label: 'Locations' },
  { id: 'floorplans', icon: LayoutGrid, label: 'Floor Plans' },
  { id: 'gallery', icon: Image, label: 'Gallery' },
  { id: 'apartments', icon: Building2, label: 'Apartments' },
]

export default function NavTabs({ activeView, setActiveView }) {
  return (
    <div className="flex flex-col w-12 bg-stone-800 z-20 border-l border-stone-700 flex-shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeView === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`
              flex flex-col items-center justify-center py-5 px-1 gap-1.5
              transition-all duration-200 border-b border-stone-700
              ${isActive
                ? 'bg-stone-600 text-white'
                : 'text-stone-400 hover:bg-stone-700 hover:text-stone-200'}
            `}
            title={tab.label}
          >
            <Icon size={15} strokeWidth={1.5} />
            <span
              className="text-[8px] tracking-widest uppercase"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
