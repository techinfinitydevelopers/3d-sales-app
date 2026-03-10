import { motion } from 'framer-motion'
import { project } from '../data/projectData'

export default function Sidebar({ activeView }) {
  return (
    <div className="h-full bg-stone-100 flex flex-col py-8 px-6 relative overflow-hidden border-r border-stone-300">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #5a4a3a 1px, transparent 0)`,
          backgroundSize: '22px 22px',
        }}
      />

      {/* Logo */}
      <div className="text-center mb-8 relative z-10">
        <h1
          className="text-3xl tracking-[0.25em] text-stone-800 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          {project.name}
        </h1>
        <h2
          className="text-2xl tracking-[0.3em] text-stone-700"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
        >
          {project.subtitle}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px w-8 bg-stone-400" />
          <p className="text-[10px] tracking-[0.2em] text-stone-500 uppercase">{project.location}</p>
          <div className="h-px w-8 bg-stone-400" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent mb-6 relative z-10" />

      {/* Description */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex-1"
      >
        <h3
          className="text-xl text-stone-800 mb-3 leading-snug"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {project.tagline}
        </h3>
        <p className="text-[11px] text-stone-600 leading-relaxed tracking-wide">
          {project.description}
        </p>

        {/* Amenities */}
        <div className="mt-6 space-y-2.5">
          {[
            '12,000 sq ft Amenities',
            'Sky Deck at 60th Floor',
            'Concierge Services 24/7',
            'Smart Home Technology',
            'Olympic-size Pool',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-1 h-1 rounded-full bg-stone-500 flex-shrink-0" />
              <span className="text-[11px] text-stone-600 tracking-wide">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RERA */}
      <div className="relative z-10 mt-4 pt-4 border-t border-stone-300">
        <p className="text-[10px] text-stone-400 tracking-widest text-center uppercase">
          RERA Reg. No. P51700047190
        </p>
      </div>
    </div>
  )
}
