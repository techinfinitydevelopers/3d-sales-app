import { useState } from 'react'
import { motion } from 'framer-motion'
import { floorPlans } from '../../data/projectData'

function Plan3BHK() {
  const S = { fill: 'none', stroke: '#8B7355', strokeWidth: 1.5 }
  const T = { fontSize: 10, fill: '#4a3a2a', fontFamily: 'Cormorant Garamond, serif' }
  const Sub = { fontSize: 8, fill: '#8B7355', fontFamily: 'Montserrat, sans-serif' }
  return (
    <svg viewBox="0 0 440 380" className="w-full h-full">
      {/* Outer wall */}
      <rect x="20" y="20" width="400" height="340" fill="#faf6f0" {...S} strokeWidth={2.5} />

      {/* Living Room */}
      <rect x="20" y="20" width="200" height="140" fill="#f5f0e8" {...S} />
      <text x="120" y="86" textAnchor="middle" {...T} fontSize={12}>Living Room</text>
      <text x="120" y="102" textAnchor="middle" {...Sub}>22′ × 18′</text>

      {/* Kitchen */}
      <rect x="220" y="20" width="100" height="95" fill="#ede8e0" {...S} />
      <text x="270" y="65" textAnchor="middle" {...T}>Kitchen</text>
      <text x="270" y="80" textAnchor="middle" {...Sub}>14′ × 12′</text>

      {/* Dining */}
      <rect x="220" y="115" width="100" height="65" fill="#f2ece2" {...S} />
      <text x="270" y="153" textAnchor="middle" {...T}>Dining</text>

      {/* Master Bedroom */}
      <rect x="320" y="20" width="100" height="140" fill="#eee8df" {...S} />
      <text x="370" y="82" textAnchor="middle" {...T}>Master</text>
      <text x="370" y="97" textAnchor="middle" {...T}>Bedroom</text>
      <text x="370" y="112" textAnchor="middle" {...Sub}>16′ × 14′</text>

      {/* Master Bath */}
      <rect x="320" y="160" width="100" height="50" fill="#ddd8cf" {...S} />
      <text x="370" y="190" textAnchor="middle" {...T} fontSize={9}>En-suite Bath</text>

      {/* Bedroom 2 */}
      <rect x="20" y="160" width="130" height="110" fill="#ede8e0" {...S} />
      <text x="85" y="220" textAnchor="middle" {...T}>Bedroom 2</text>
      <text x="85" y="235" textAnchor="middle" {...Sub}>14′ × 12′</text>

      {/* Bedroom 3 */}
      <rect x="150" y="160" width="120" height="110" fill="#f0ebe2" {...S} />
      <text x="210" y="220" textAnchor="middle" {...T}>Bedroom 3</text>
      <text x="210" y="235" textAnchor="middle" {...Sub}>13′ × 12′</text>

      {/* Study */}
      <rect x="270" y="210" width="150" height="60" fill="#e8e3da" {...S} />
      <text x="345" y="245" textAnchor="middle" {...T}>Study / WFH</text>

      {/* Common Bath */}
      <rect x="270" y="270" width="80" height="50" fill="#d8d3ca" {...S} />
      <text x="310" y="300" textAnchor="middle" {...T} fontSize={9}>Bath</text>

      {/* Utility */}
      <rect x="350" y="270" width="70" height="50" fill="#e0dbd2" {...S} />
      <text x="385" y="300" textAnchor="middle" {...T} fontSize={9}>Utility</text>

      {/* Balcony */}
      <rect x="20" y="270" width="250" height="50" fill="#e4dfd6" {...S} strokeDasharray="6,3" />
      <text x="145" y="300" textAnchor="middle" {...T}>Balcony / Terrace</text>

      {/* Door indicators */}
      <path d="M220 20 Q220 35 235 35" fill="none" stroke="#8B7355" strokeWidth="0.8" />
      <path d="M20 160 Q35 160 35 175" fill="none" stroke="#8B7355" strokeWidth="0.8" />

      {/* Compass */}
      <text x="408" y="345" {...Sub} fontSize={13} fill="#8B7355">N↑</text>

      {/* Scale bar */}
      <line x1="20" y1="368" x2="120" y2="368" stroke="#8B7355" strokeWidth="1.5" />
      <line x1="20" y1="363" x2="20" y2="373" stroke="#8B7355" strokeWidth="1.5" />
      <line x1="120" y1="363" x2="120" y2="373" stroke="#8B7355" strokeWidth="1.5" />
      <text x="70" y="378" textAnchor="middle" {...Sub}>10 metres</text>
    </svg>
  )
}

function Plan4BHK() {
  const S = { fill: 'none', stroke: '#8B7355', strokeWidth: 1.5 }
  const T = { fontSize: 10, fill: '#4a3a2a', fontFamily: 'Cormorant Garamond, serif' }
  const Sub = { fontSize: 8, fill: '#8B7355', fontFamily: 'Montserrat, sans-serif' }
  return (
    <svg viewBox="0 0 440 380" className="w-full h-full">
      <rect x="20" y="20" width="400" height="340" fill="#faf6f0" {...S} strokeWidth={2.5} />

      {/* Grand Living */}
      <rect x="20" y="20" width="240" height="160" fill="#f5f0e8" {...S} />
      <text x="140" y="96" textAnchor="middle" {...T} fontSize={12}>Grand Living Room</text>
      <text x="140" y="112" textAnchor="middle" {...Sub}>28′ × 22′</text>

      {/* Kitchen */}
      <rect x="260" y="20" width="160" height="90" fill="#ede8e0" {...S} />
      <text x="340" y="62" textAnchor="middle" {...T}>Kitchen</text>
      <text x="340" y="77" textAnchor="middle" {...Sub}>18′ × 14′</text>

      {/* Dining */}
      <rect x="260" y="110" width="160" height="80" fill="#f2ece2" {...S} />
      <text x="340" y="155" textAnchor="middle" {...T}>Dining Room</text>

      {/* Master Suite */}
      <rect x="20" y="180" width="175" height="140" fill="#eee8df" {...S} />
      <text x="107" y="250" textAnchor="middle" {...T}>Master Suite</text>
      <text x="107" y="266" textAnchor="middle" {...Sub}>20′ × 18′</text>

      {/* Bedroom 2 */}
      <rect x="195" y="180" width="130" height="90" fill="#ede8e0" {...S} />
      <text x="260" y="230" textAnchor="middle" {...T}>Bedroom 2</text>
      <text x="260" y="245" textAnchor="middle" {...Sub}>15′ × 13′</text>

      {/* Bedroom 3 */}
      <rect x="325" y="180" width="95" height="90" fill="#f0ebe2" {...S} />
      <text x="372" y="230" textAnchor="middle" {...T}>Bedroom 3</text>

      {/* Bedroom 4 */}
      <rect x="195" y="270" width="130" height="90" fill="#e8e3da" {...S} />
      <text x="260" y="320" textAnchor="middle" {...T}>Bedroom 4</text>

      {/* Home Theatre */}
      <rect x="325" y="270" width="95" height="90" fill="#ddd8cf" {...S} />
      <text x="372" y="308" textAnchor="middle" {...T} fontSize={9}>Home</text>
      <text x="372" y="323" textAnchor="middle" {...T} fontSize={9}>Theatre</text>

      <text x="408" y="345" {...Sub} fontSize={13} fill="#8B7355">N↑</text>
      <line x1="20" y1="368" x2="120" y2="368" stroke="#8B7355" strokeWidth="1.5" />
      <line x1="20" y1="363" x2="20" y2="373" stroke="#8B7355" strokeWidth="1.5" />
      <line x1="120" y1="363" x2="120" y2="373" stroke="#8B7355" strokeWidth="1.5" />
      <text x="70" y="378" textAnchor="middle" {...Sub}>10 metres</text>
    </svg>
  )
}

const PlanComponents = [Plan3BHK, Plan4BHK]

export default function FloorPlansView() {
  const [selected, setSelected] = useState(0)
  const Plan = PlanComponents[selected]
  const plan = floorPlans[selected]

  return (
    <div className="w-full h-full flex bg-stone-900">
      {/* Plan display */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-stone-50 relative">
        <motion.div
          key={selected}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full flex-1 flex items-center justify-center"
          style={{ maxHeight: 'calc(100% - 60px)' }}
        >
          <div className="w-full h-full" style={{ maxWidth: 560, maxHeight: 480 }}>
            <Plan />
          </div>
        </motion.div>

        {/* Type selector */}
        <div className="flex gap-3 mt-4 flex-shrink-0">
          {floorPlans.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(i)}
              className={`px-5 py-2 text-[11px] tracking-widest transition-all ${
                selected === i
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info panel */}
      <div className="w-64 bg-stone-900 p-6 border-l border-stone-700 flex flex-col flex-shrink-0">
        <h3
          className="text-stone-200 text-xl mb-1"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Floor Plan
        </h3>
        <p className="text-stone-500 text-[10px] tracking-widest mb-6 uppercase">Unit Details</p>

        <motion.div key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
          <div className="mb-4">
            <p className="text-stone-500 text-[10px] tracking-widest mb-1">TYPE</p>
            <p
              className="text-stone-200 text-lg"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {plan.name}
            </p>
          </div>
          <div className="mb-5">
            <p className="text-stone-500 text-[10px] tracking-widest mb-1">CARPET AREA</p>
            <p className="text-stone-200 text-sm">{plan.area}</p>
          </div>
          <div>
            <p className="text-stone-500 text-[10px] tracking-widest mb-2">SPACES</p>
            <div className="space-y-2">
              {plan.rooms.map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                  <span className="text-stone-300 text-[11px]">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-auto space-y-2">
          <button className="w-full py-2.5 bg-stone-700 hover:bg-stone-600 text-stone-200 text-[11px] tracking-widest transition-colors">
            DOWNLOAD BROCHURE
          </button>
        </div>
      </div>
    </div>
  )
}
