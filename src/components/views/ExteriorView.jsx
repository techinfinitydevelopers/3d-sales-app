import { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// ── Floor config ───────────────────────────────────────────────────────────────
const FLOORS = [
  { id: 'f60', label: '60th Floor', sublabel: 'Sky Deck Level', file: '/floor-30.JPG' },
  { id: 'f30', label: '30th Floor', sublabel: 'Mid Level',      file: '/kalyan-tharwani.JPG' },
  { id: 'f05', label: '5th Floor',  sublabel: 'Ground Level',   file: '/floor-05.JPG' },
]

// ── Location hotspots ─────────────────────────────────────────────────────────
// Tweak position [x, y, z] to align each pin with the right spot in your panorama.
// All positions are on a virtual sphere of radius ~80, camera at origin.
const HOTSPOTS = [
  {
    id: 'h1', position: [0, 14, -80],
    label: 'ROOFTOP INFINITY POOL', sublabel: 'Level 60 · Amenity',
    icon: '🏊', category: 'amenity',
    info: 'Infinity-edge pool with a panoramic 270° city vista. Open sunrise to midnight.',
    distance: 'On-site',
  },
  {
    id: 'h2', position: [62, 6, -52],
    label: 'SKY LOUNGE & BAR', sublabel: 'Level 58 · Amenity',
    icon: '🍸', category: 'amenity',
    info: 'Exclusive residents lounge with craft cocktails and unobstructed sunset views.',
    distance: 'On-site',
  },
  {
    id: 'h3', position: [80, -8, -15],
    label: 'METRO STATION', sublabel: '5 min · 400 m',
    icon: '🚇', category: 'transport',
    info: 'Direct metro connectivity to CBD, Airport, and all major commercial hubs.',
    distance: '400 m',
  },
  {
    id: 'h4', position: [-72, -4, -36],
    label: 'INTERNATIONAL AIRPORT', sublabel: '25 min · 18 km',
    icon: '✈️', category: 'transport',
    info: 'Seamless expressway access. Average 25-minute drive to Terminal 2.',
    distance: '18 km',
  },
  {
    id: 'h5', position: [28, -18, 74],
    label: 'GRAND SHOPPING MALL', sublabel: '8 min · 1.2 km',
    icon: '🛍️', category: 'retail',
    info: '200+ brands, gourmet food court, multiplex cinema, and entertainment zone.',
    distance: '1.2 km',
  },
  {
    id: 'h6', position: [-42, -14, 66],
    label: 'INTERNATIONAL SCHOOL', sublabel: '12 min · 2 km',
    icon: '🎓', category: 'education',
    info: 'Top-rated IB curriculum school with state-of-the-art facilities.',
    distance: '2 km',
  },
  {
    id: 'h7', position: [-76, -4, 28],
    label: 'CITY HOSPITAL', sublabel: '10 min · 1.8 km',
    icon: '🏥', category: 'health',
    info: 'Super-speciality hospital with 24/7 emergency care and helipad access.',
    distance: '1.8 km',
  },
  {
    id: 'h8', position: [50, -16, 60],
    label: 'IT BUSINESS PARK', sublabel: '15 min · 3 km',
    icon: '🏢', category: 'business',
    info: 'Major tech campus hub hosting 50+ MNCs — ideal for work-from-proximity.',
    distance: '3 km',
  },
]

// ── Category colours ──────────────────────────────────────────────────────────
const CAT = {
  amenity:   { color: '#fbbf24', label: 'Amenity'   },
  transport: { color: '#38bdf8', label: 'Transport' },
  retail:    { color: '#f87171', label: 'Retail'    },
  education: { color: '#34d399', label: 'Education' },
  health:    { color: '#c084fc', label: 'Health'    },
  business:  { color: '#fb923c', label: 'Business'  },
}

// ── Texture loader hook ───────────────────────────────────────────────────────
function useFloorTexture(file) {
  const [texture, setTexture] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTexture(null)
    setLoading(true)
    new THREE.TextureLoader().load(
      file,
      (tex) => { tex.colorSpace = THREE.SRGBColorSpace; setTexture(tex); setLoading(false) },
      undefined,
      () => { setLoading(false) }
    )
  }, [file])

  return { texture, loading }
}

// ── Panorama sphere ───────────────────────────────────────────────────────────
function Panorama360({ texture }) {
  return (
    <mesh>
      <sphereGeometry args={[100, 64, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

// ── Scroll → FOV zoom (clamped 30°–100°) ─────────────────────────────────────
function ZoomController() {
  const { camera, gl } = useThree()

  useEffect(() => {
    const el = gl.domElement
    const onWheel = (e) => {
      e.preventDefault()
      camera.fov = THREE.MathUtils.clamp(camera.fov + e.deltaY * 0.05, 30, 100)
      camera.updateProjectionMatrix()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [camera, gl])

  return null
}

// ── Hotspot pin inside the Canvas ────────────────────────────────────────────
function HotspotPin({ hotspot, onSelect, isActive, visible }) {
  const c = CAT[hotspot.category] || CAT.amenity

  if (!visible) return null

  return (
    <Html position={hotspot.position} center zIndexRange={[100, 0]}>
      <div
        onClick={() => onSelect(hotspot)}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
        className="flex flex-col items-center cursor-pointer select-none group"
      >
        {/* Outer ping ring */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <span
            className="absolute w-16 h-16 rounded-full animate-ping opacity-25"
            style={{ border: `2px solid ${c.color}` }}
          />
          {/* Inner dot */}
          <span
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-xl z-10 transition-transform duration-200 group-hover:scale-110"
            style={{
              background: isActive ? c.color : `${c.color}cc`,
              boxShadow: isActive ? `0 0 22px ${c.color}88` : 'none',
            }}
          >
            {hotspot.icon}
          </span>
        </div>

        {/* Label chip */}
        <div
          className="mt-2 px-3 py-1.5 bg-stone-950/90 backdrop-blur-sm transition-all duration-200 whitespace-nowrap"
          style={{
            border: `1px solid ${isActive ? c.color : '#57534e'}`,
            boxShadow: isActive ? `0 0 12px ${c.color}44` : 'none',
          }}
        >
          <div
            className="text-[13px] tracking-widest font-semibold"
            style={{ color: isActive ? c.color : '#e7e5e4' }}
          >
            {hotspot.label}
          </div>
          <div className="text-[11px] text-stone-500 text-center tracking-wide mt-0.5">
            {hotspot.sublabel}
          </div>
        </div>
      </div>
    </Html>
  )
}

// ── 3D Scene ──────────────────────────────────────────────────────────────────
function Scene({ texture, onHotspotSelect, activeHotspotId, hotspotsVisible }) {
  return (
    <>
      {texture && <Panorama360 texture={texture} />}
      <ambientLight intensity={1} />
      <ZoomController />

      {HOTSPOTS.map(h => (
        <HotspotPin
          key={h.id}
          hotspot={h}
          onSelect={onHotspotSelect}
          isActive={activeHotspotId === h.id}
          visible={hotspotsVisible}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
        rotateSpeed={-0.4}
      />
    </>
  )
}

// ── Hotspot info card (bottom-right overlay) ──────────────────────────────────
function HotspotCard({ hotspot, onClose }) {
  const c = CAT[hotspot.category] || CAT.amenity

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{ opacity: 0,  y: 14, scale: 0.97 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="absolute bottom-28 right-6 z-30 w-72 bg-stone-950/96 backdrop-blur-lg shadow-2xl overflow-hidden"
      style={{ border: `1px solid ${c.color}55`, fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* colour accent bar */}
      <div className="h-0.5 w-full" style={{ background: c.color }} />

      {/* header */}
      <div className="px-4 pt-3 pb-2.5 flex items-start justify-between gap-2 border-b border-stone-800">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">{hotspot.icon}</span>
            <span className="text-[10px] tracking-widest font-bold truncate" style={{ color: c.color }}>
              {hotspot.label}
            </span>
          </div>
          <div className="text-[9px] text-stone-400 tracking-wider mt-1">{hotspot.sublabel}</div>
        </div>
        <button
          onClick={onClose}
          className="text-stone-600 hover:text-stone-200 transition-colors text-xl leading-none shrink-0"
        >
          ×
        </button>
      </div>

      {/* body */}
      <div className="px-4 py-3">
        <p className="text-stone-300 text-[10px] leading-relaxed tracking-wide">
          {hotspot.info}
        </p>
      </div>

      {/* footer */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <span
          className="inline-block px-2 py-0.5 text-[8px] tracking-widest uppercase"
          style={{ color: c.color, border: `1px solid ${c.color}66` }}
        >
          {c.label}
        </span>
        {hotspot.distance !== 'On-site' && (
          <span className="text-stone-500 text-[9px] tracking-wider">📍 {hotspot.distance}</span>
        )}
      </div>
    </motion.div>
  )
}

// ── Bottom toolbar (hotspot toggle + zoom hint) ───────────────────────────────
function Toolbar({ hotspotsVisible, onToggleHotspots }) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      {/* Hotspot toggle */}
      <button
        onClick={onToggleHotspots}
        title={hotspotsVisible ? 'Hide hotspots' : 'Show hotspots'}
        className={`flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest border backdrop-blur-sm transition-all duration-200 ${
          hotspotsVisible
            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
            : 'bg-stone-900/70 border-stone-600 text-stone-400 hover:border-stone-400'
        }`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        <span className="text-sm">📍</span>
        {hotspotsVisible ? 'HIDE LOCATIONS' : 'SHOW LOCATIONS'}
      </button>
    </div>
  )
}

// ── Zoom controls (+ / − buttons, bottom-left) ────────────────────────────────
function ZoomButtons({ onZoom }) {
  return (
    <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
      <button
        onClick={() => onZoom(-10)}
        className="w-8 h-8 bg-stone-900/80 border border-stone-600 text-stone-300 hover:bg-stone-700 hover:text-white text-lg flex items-center justify-center backdrop-blur-sm transition-colors"
        title="Zoom in"
      >+</button>
      <button
        onClick={() => onZoom(+10)}
        className="w-8 h-8 bg-stone-900/80 border border-stone-600 text-stone-300 hover:bg-stone-700 hover:text-white text-lg flex items-center justify-center backdrop-blur-sm transition-colors"
        title="Zoom out"
      >−</button>
    </div>
  )
}

// ── Floor selector ────────────────────────────────────────────────────────────
function FloorSelector({ floors, active, onChange }) {
  return (
    <div className="absolute bottom-10 right-6 flex flex-col-reverse items-end gap-2 z-20">
      {floors.map((floor) => {
        const isActive = floor.id === active
        return (
          <button
            key={floor.id}
            onClick={() => onChange(floor.id)}
            className="flex items-center gap-2 group transition-all duration-300"
          >
            {/* bar */}
            <motion.div
              animate={{ width: isActive ? 24 : 12, opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
              className={`h-0.5 ${isActive ? 'bg-amber-400' : 'bg-white/40 group-hover:bg-white/70'}`}
            />
            {/* chip */}
            <div
              className={`px-3 py-1.5 text-[10px] tracking-widest transition-all duration-300 border backdrop-blur-sm ${
                isActive
                  ? 'bg-stone-900/95 text-amber-400 border-amber-500'
                  : 'bg-stone-900/60 text-stone-300 border-stone-600 hover:border-stone-400'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {floor.label}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── Legend (top-left) ─────────────────────────────────────────────────────────
function Legend({ visible }) {
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="absolute top-16 left-4 z-20 bg-stone-950/85 backdrop-blur-sm border border-stone-700 px-3 py-2.5"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <div className="text-[8px] text-stone-500 tracking-widest mb-2">LEGEND</div>
      {Object.entries(CAT).map(([key, val]) => (
        <div key={key} className="flex items-center gap-2 mb-1 last:mb-0">
          <div className="w-2 h-2 rounded-full" style={{ background: val.color }} />
          <span className="text-[8px] text-stone-400 tracking-wider">{val.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ExteriorView() {
  const [activeFloorId, setActiveFloorId]   = useState('f60')
  const [activeHotspot, setActiveHotspot]   = useState(null)
  const [hotspotsVisible, setHotspotsVisible] = useState(true)
  const cameraFovRef = useRef(90)           // shared ref so zoom buttons can read current FOV
  const canvasRef    = useRef(null)

  const activeFloor = FLOORS.find(f => f.id === activeFloorId)
  const { texture, loading } = useFloorTexture(activeFloor.file)

  const handleFloorChange = (id) => {
    setActiveFloorId(id)
    setActiveHotspot(null)
  }

  const handleHotspotSelect = useCallback((hotspot) => {
    setActiveHotspot(prev => prev?.id === hotspot.id ? null : hotspot)
  }, [])

  // Button zoom: dispatch a synthetic wheel event on the canvas so ZoomController picks it up
  const handleZoomButton = (deltaY) => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const ev = new WheelEvent('wheel', { deltaY: deltaY * 20, bubbles: true, cancelable: true })
    canvas.dispatchEvent(ev)
  }

  return (
    <div className="relative w-full h-full" ref={canvasRef}>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <div className="flex items-center gap-3 bg-stone-900/70 px-5 py-3 backdrop-blur-sm">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-stone-300 text-[11px] tracking-widest">
                LOADING {activeFloor.label.toUpperCase()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFloorId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Canvas camera={{ position: [0, 0, 0.1], fov: 90 }} gl={{ antialias: true }}>
            <Scene
              texture={texture}
              onHotspotSelect={handleHotspotSelect}
              activeHotspotId={activeHotspot?.id}
              hotspotsVisible={hotspotsVisible}
            />
          </Canvas>
        </motion.div>
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute top-4 right-6 text-white/40 text-[9px] tracking-widest pointer-events-none">
        DRAG · SCROLL TO ZOOM · 360°
      </div>

      {/* Floor badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-stone-900/70 backdrop-blur-sm px-4 py-1.5 border border-stone-600">
        <span className="text-amber-400 text-[10px] tracking-widest">{activeFloor.label.toUpperCase()}</span>
        <span className="text-stone-500 text-[10px] tracking-widest"> · {activeFloor.sublabel.toUpperCase()}</span>
      </div>

      {/* Legend */}
      <AnimatePresence>
        {hotspotsVisible && <Legend visible={hotspotsVisible} />}
      </AnimatePresence>

      {/* Hotspot info card */}
      <AnimatePresence>
        {activeHotspot && (
          <HotspotCard
            key={activeHotspot.id}
            hotspot={activeHotspot}
            onClose={() => setActiveHotspot(null)}
          />
        )}
      </AnimatePresence>

      {/* Zoom ± buttons */}
      <ZoomButtons onZoom={handleZoomButton} />

      {/* Hotspot toggle toolbar */}
      <Toolbar hotspotsVisible={hotspotsVisible} onToggleHotspots={() => { setHotspotsVisible(v => !v); setActiveHotspot(null) }} />

      {/* Floor selector — right side like reference */}
      <FloorSelector floors={FLOORS} active={activeFloorId} onChange={handleFloorChange} />
    </div>
  )
}
