import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'

const landmarks = [
  { name: 'International Airport', distance: '15 min', icon: '✈️' },
  { name: 'Central Business District', distance: '10 min', icon: '🏢' },
  { name: 'Metro Station', distance: '5 min walk', icon: '🚇' },
  { name: 'Premium Schools', distance: '8 min', icon: '🎓' },
  { name: 'Shopping Mall', distance: '3 min', icon: '🛍️' },
  { name: 'Hospitals', distance: '7 min', icon: '🏥' },
  { name: 'IT Parks', distance: '12 min', icon: '💻' },
  { name: 'Sea Front', distance: '20 min', icon: '🌊' },
]

const mapDots = [
  { top: '28%', left: '22%', label: 'Airport', color: '#60a5fa' },
  { top: '58%', left: '68%', label: 'CBD', color: '#34d399' },
  { top: '48%', left: '36%', label: 'Metro', color: '#a78bfa' },
  { top: '38%', left: '62%', label: 'Mall', color: '#fb923c' },
  { top: '65%', left: '30%', label: 'Schools', color: '#fbbf24' },
  { top: '35%', left: '48%', label: 'Hospital', color: '#f87171' },
]

export default function LocationsView() {
  return (
    <div className="w-full h-full flex">
      {/* Map */}
      <div className="flex-1 relative overflow-hidden">
        {/* Dark map background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(140deg, #1a2535 0%, #1e2d3d 60%, #16202e 100%)' }}
        >
          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
            <defs>
              <pattern id="mgrid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#a0b4c8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mgrid)" />
          </svg>

          {/* Roads */}
          <svg className="absolute inset-0 w-full h-full opacity-25" aria-hidden="true">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#c8b89a" strokeWidth="2.5" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#c8b89a" strokeWidth="2.5" />
            <line x1="25%" y1="0" x2="75%" y2="100%" stroke="#c8b89a" strokeWidth="1.2" />
            <line x1="0" y1="30%" x2="100%" y2="70%" stroke="#c8b89a" strokeWidth="1" />
            <line x1="0" y1="70%" x2="100%" y2="30%" stroke="#c8b89a" strokeWidth="0.8" />
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="#c8b89a" strokeWidth="0.5" strokeDasharray="6,4" />
            <circle cx="50%" cy="50%" r="150" fill="none" stroke="#c8b89a" strokeWidth="0.5" strokeDasharray="6,4" />
          </svg>

          {/* Landmark dots */}
          {mapDots.map((dot, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.12 + 0.3 }}
              className="absolute flex items-center gap-1.5"
              style={{ top: dot.top, left: dot.left }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                style={{ background: dot.color }}
              />
              <span className="text-[10px] tracking-wide whitespace-nowrap" style={{ color: dot.color }}>
                {dot.label}
              </span>
            </motion.div>
          ))}

          {/* Central pin — Project location */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="relative flex flex-col items-center"
            >
              <div className="text-[10px] tracking-widest text-white bg-stone-800/90 px-3 py-1 mb-2 border border-stone-600">
                SKYLINE ZENITH
              </div>
              <div className="w-9 h-9 bg-stone-900 rounded-full border-2 border-amber-500 flex items-center justify-center">
                <MapPin size={16} className="text-amber-500" />
              </div>
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute top-8 w-9 h-9 rounded-full border border-amber-400"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Landmarks panel */}
      <div className="w-72 bg-stone-900 p-6 overflow-y-auto border-l border-stone-700 flex-shrink-0">
        <h3
          className="text-stone-200 text-xl mb-1"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Location
        </h3>
        <p className="text-stone-500 text-[10px] tracking-widest mb-6 uppercase">
          Connectivity & Landmarks
        </p>
        <div className="space-y-2.5">
          {landmarks.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.2 }}
              className="flex items-center justify-between p-3 bg-stone-800 border border-stone-700 rounded-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{l.icon}</span>
                <span className="text-stone-300 text-[11px] tracking-wide">{l.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 text-[11px] flex-shrink-0">
                <Clock size={10} />
                <span>{l.distance}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
