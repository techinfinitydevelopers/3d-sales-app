import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// ── Floor config — drop image files in public/ to activate each floor ─────────
const FLOORS = [
  { id: 'f60', label: '60th Floor', sublabel: 'Sky Deck Level', file: '/floor-30.JPG' },
  { id: 'f30', label: '30th Floor', sublabel: 'Mid Level',      file: '/kalyan-tharwani.JPG' },
  { id: 'f05', label: '5th Floor',  sublabel: 'Ground Level',   file: '/floor-05.JPG' },
]

// ── Load texture via callback (never throws) ──────────────────────────────────
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

// ── Hotspot labels ────────────────────────────────────────────────────────────
function HotspotLabel({ label, position }) {
  return (
    <Html position={position} center distanceFactor={20}>
      <div
        className="px-3 py-1.5 bg-stone-900/80 text-stone-100 text-[10px] tracking-widest whitespace-nowrap cursor-pointer border border-stone-500 hover:bg-stone-700 transition-colors select-none backdrop-blur-sm"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        ◀ {label}
      </div>
    </Html>
  )
}

// ── 3D Scene ──────────────────────────────────────────────────────────────────
function Scene({ texture }) {
  return (
    <>
      {texture && <Panorama360 texture={texture} />}
      <ambientLight intensity={1} />
      <HotspotLabel label="ROOFTOP INFINITY POOL"  position={[0, 30, -80]}  />
      <HotspotLabel label="SKY LOUNGE & BAR"        position={[60, 20, -60]} />
      <HotspotLabel label="ARENA — THE PODIUM"      position={[80, -10, -30]}/>
      <HotspotLabel label="LOBBY DROP-OFF"           position={[-70, -15, -40]}/>
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

// ── Floor Selector UI ─────────────────────────────────────────────────────────
function FloorSelector({ floors, active, onChange }) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-3 z-20">
      {floors.map((floor) => {
        const isActive = floor.id === active
        return (
          <button
            key={floor.id}
            onClick={() => onChange(floor.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 group`}
          >
            {/* Bar indicator */}
            <motion.div
              animate={{ height: isActive ? 36 : 20, opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              className={`w-0.5 ${isActive ? 'bg-amber-400' : 'bg-white/40 group-hover:bg-white/70'}`}
            />
            {/* Label */}
            <div className={`px-3 py-1.5 text-[10px] tracking-widest transition-all duration-300 border backdrop-blur-sm ${
              isActive
                ? 'bg-stone-900/90 text-amber-400 border-amber-500'
                : 'bg-stone-900/60 text-stone-300 border-stone-600 hover:border-stone-400'
            }`}>
              <div className="font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {floor.label}
              </div>
              <div className="text-[9px] opacity-60 text-center">{floor.sublabel}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ExteriorView() {
  const [activeFloorId, setActiveFloorId] = useState('f60')
  const activeFloor = FLOORS.find(f => f.id === activeFloorId)
  const { texture, loading } = useFloorTexture(activeFloor.file)
  const controlsRef = useRef()

  // Reset camera look direction when floor changes
  const handleFloorChange = (id) => {
    setActiveFloorId(id)
    if (controlsRef.current) controlsRef.current.reset?.()
  }

  return (
    <div className="relative w-full h-full">

      {/* Loading indicator */}
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
          <Canvas
            camera={{ position: [0, 0, 0.1], fov: 90 }}
            gl={{ antialias: true }}
          >
            <Scene texture={texture} />
          </Canvas>
        </motion.div>
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute top-4 right-16 text-white/50 text-[10px] tracking-widest pointer-events-none">
        DRAG TO LOOK AROUND · 360° VIEW
      </div>

      {/* Active floor badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-stone-900/70 backdrop-blur-sm px-4 py-1.5 border border-stone-600">
        <span className="text-amber-400 text-[10px] tracking-widest">{activeFloor.label.toUpperCase()}</span>
        <span className="text-stone-500 text-[10px] tracking-widest"> · {activeFloor.sublabel.toUpperCase()}</span>
      </div>

      {/* Floor selector */}
      <FloorSelector floors={FLOORS} active={activeFloorId} onChange={handleFloorChange} />
    </div>
  )
}
