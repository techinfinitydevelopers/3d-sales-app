import { useState, useRef, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { units } from '../../data/projectData'

// ── Movement controller ──────────────────────────────────────────────────────
function MovementController() {
  const keys = useRef({})
  const { camera } = useThree()
  const front = useRef(new THREE.Vector3())
  const side = useRef(new THREE.Vector3())
  const dir = useRef(new THREE.Vector3())

  useEffect(() => {
    const dn = (e) => { keys.current[e.code] = true }
    const up = (e) => { keys.current[e.code] = false }
    window.addEventListener('keydown', dn)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', dn); window.removeEventListener('keyup', up) }
  }, [])

  useFrame(() => {
    const speed = 0.055
    const fwd = (keys.current['KeyW'] || keys.current['ArrowUp'] ? 1 : 0) - (keys.current['KeyS'] || keys.current['ArrowDown'] ? 1 : 0)
    const strafe = (keys.current['KeyD'] || keys.current['ArrowRight'] ? 1 : 0) - (keys.current['KeyA'] || keys.current['ArrowLeft'] ? 1 : 0)

    front.current.set(0, 0, -fwd)
    side.current.set(strafe, 0, 0)
    dir.current.addVectors(front.current, side.current)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(new THREE.Euler(0, camera.rotation.y, 0))

    camera.position.add(dir.current)
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -6.2, 6.2)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -4.8, 4.8)
    camera.position.y = 1.7
  })

  return null
}

// ── Room geometry ─────────────────────────────────────────────────────────────
function Room() {
  const wallCol = '#f0ebe2'
  const floorCol = '#c4b49a'

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 11]} />
        <meshStandardMaterial color={floorCol} roughness={0.25} metalness={0.08} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.1, 0]}>
        <planeGeometry args={[14, 11]} />
        <meshStandardMaterial color="#faf8f4" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.55, -5.5]} receiveShadow>
        <planeGeometry args={[14, 3.1]} />
        <meshStandardMaterial color={wallCol} roughness={0.8} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7, 1.55, 0]} receiveShadow>
        <planeGeometry args={[11, 3.1]} />
        <meshStandardMaterial color={wallCol} roughness={0.8} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[7, 1.55, 0]} receiveShadow>
        <planeGeometry args={[11, 3.1]} />
        <meshStandardMaterial color={wallCol} roughness={0.8} />
      </mesh>

      {/* Front wall — left section */}
      <mesh position={[-3.5, 1.55, 5.5]}>
        <planeGeometry args={[7, 3.1]} />
        <meshStandardMaterial color={wallCol} roughness={0.8} />
      </mesh>

      {/* Front wall — right section */}
      <mesh position={[5.5, 1.55, 5.5]}>
        <planeGeometry args={[3, 3.1]} />
        <meshStandardMaterial color={wallCol} roughness={0.8} />
      </mesh>

      {/* Large window glass */}
      <mesh position={[1.5, 1.7, 5.49]}>
        <planeGeometry args={[5.8, 2.6]} />
        <meshStandardMaterial color="#aad4ee" transparent opacity={0.28} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Window frame */}
      {/* horizontal bars */}
      <mesh position={[1.5, 3.0, 5.48]}>
        <boxGeometry args={[6.2, 0.08, 0.04]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      <mesh position={[1.5, 0.4, 5.48]}>
        <boxGeometry args={[6.2, 0.08, 0.04]} />
        <meshStandardMaterial color="#c8b89a" />
      </mesh>
      {/* vertical bars */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.7, 5.48]}>
          <boxGeometry args={[0.06, 2.7, 0.04]} />
          <meshStandardMaterial color="#c8b89a" />
        </mesh>
      ))}

      {/* City-view backdrop behind window */}
      <mesh position={[1.5, 1.7, 6.5]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#a8c8e8" emissive="#304560" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

// ── Furniture ─────────────────────────────────────────────────────────────────
function Furniture() {
  const wood = { color: '#3d2b1f', roughness: 0.45, metalness: 0.1 }
  const sofa = { color: '#8B7355', roughness: 0.85 }
  const cushion = { color: '#d4c5a9', roughness: 0.9 }

  return (
    <group>
      {/* Sofa base */}
      <mesh position={[0, 0.3, -3.2]} castShadow>
        <boxGeometry args={[3.2, 0.58, 1.1]} />
        <meshStandardMaterial {...sofa} />
      </mesh>
      {/* Sofa back */}
      <mesh position={[0, 0.82, -3.7]} castShadow>
        <boxGeometry args={[3.2, 0.72, 0.16]} />
        <meshStandardMaterial {...sofa} />
      </mesh>
      {/* Sofa armrests */}
      {[-1.55, 1.55].map((x, i) => (
        <mesh key={i} position={[x, 0.52, -3.2]} castShadow>
          <boxGeometry args={[0.12, 0.22, 1.1]} />
          <meshStandardMaterial color="#7a6248" roughness={0.85} />
        </mesh>
      ))}
      {/* Cushions */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.64, -3.2]}>
          <boxGeometry args={[0.85, 0.22, 0.6]} />
          <meshStandardMaterial {...cushion} />
        </mesh>
      ))}

      {/* Coffee table top */}
      <mesh position={[0, 0.42, -1.7]} castShadow>
        <boxGeometry args={[1.6, 0.06, 0.75]} />
        <meshStandardMaterial {...wood} />
      </mesh>
      {/* Coffee table legs */}
      {[[-0.7, -0.32], [-0.7, 0.32], [0.7, -0.32], [0.7, 0.32]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z - 1.7]}>
          <boxGeometry args={[0.05, 0.42, 0.05]} />
          <meshStandardMaterial {...wood} />
        </mesh>
      ))}

      {/* TV unit */}
      <mesh position={[0, 0.28, -5.25]} castShadow>
        <boxGeometry args={[4.5, 0.55, 0.45]} />
        <meshStandardMaterial color="#2d1f17" roughness={0.55} />
      </mesh>
      {/* TV screen */}
      <mesh position={[0, 1.18, -5.25]}>
        <boxGeometry args={[2.8, 1.5, 0.06]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.85} roughness={0.1} />
      </mesh>
      {/* TV screen glow */}
      <mesh position={[0, 1.18, -5.22]}>
        <boxGeometry args={[2.6, 1.3, 0.01]} />
        <meshStandardMaterial color="#1a3a5c" emissive="#0d2540" emissiveIntensity={0.7} />
      </mesh>

      {/* Side table */}
      <mesh position={[5.5, 0.55, -2.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
        <meshStandardMaterial {...wood} />
      </mesh>
      <mesh position={[5.5, 0.28, -2.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.55, 8]} />
        <meshStandardMaterial color="#5a3d2b" />
      </mesh>

      {/* Table lamp */}
      <mesh position={[5.5, 0.72, -2.5]}>
        <cylinderGeometry args={[0, 0.22, 0.28, 8]} />
        <meshStandardMaterial color="#e8dcc8" emissive="#ffc87a" emissiveIntensity={0.3} />
      </mesh>

      {/* Indoor plant */}
      <group position={[-5.8, 0, -4.5]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.44, 10]} />
          <meshStandardMaterial color="#8B6355" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[0.46, 8, 7]} />
          <meshStandardMaterial color="#2d6a2d" roughness={0.95} />
        </mesh>
        <mesh position={[0.2, 0.9, 0.1]}>
          <sphereGeometry args={[0.28, 6, 5]} />
          <meshStandardMaterial color="#3a7a3a" roughness={0.95} />
        </mesh>
      </group>

      {/* Area rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -2.2]}>
        <planeGeometry args={[4.5, 3]} />
        <meshStandardMaterial color="#8a7060" roughness={1} />
      </mesh>
    </group>
  )
}

// ── Lighting ──────────────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#fffaf0" />
      {/* Window daylight */}
      <directionalLight position={[2, 4, 8]} intensity={1.6} color="#d4eaff" castShadow />
      {/* Ceiling spotlights */}
      {[[-2.5, 0], [2.5, 0], [0, -2], [0, 2]].map(([x, z], i) => (
        <group key={i}>
          <mesh position={[x, 3.05, z]}>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 8]} />
            <meshStandardMaterial color="#b0a090" />
          </mesh>
          <pointLight
            position={[x, 2.9, z]}
            intensity={0.9}
            distance={5.5}
            color="#ffe8cc"
            castShadow={i === 0}
          />
        </group>
      ))}
      {/* Lamp light */}
      <pointLight position={[5.5, 0.9, -2.5]} intensity={0.6} distance={3} color="#ffc87a" />
    </>
  )
}

// ── Tour scene ────────────────────────────────────────────────────────────────
function TourScene({ controlsRef }) {
  return (
    <>
      <Lights />
      <Room />
      <Furniture />
      <PointerLockControls ref={controlsRef} />
      <MovementController />
    </>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ApartmentsView() {
  const [selectedUnit, setSelectedUnit] = useState(0)
  const [tourActive, setTourActive] = useState(false)
  const controlsRef = useRef()
  const unit = units[selectedUnit]

  const startTour = () => {
    setTourActive(true)
    setTimeout(() => controlsRef.current?.lock(), 80)
  }

  useEffect(() => {
    const handler = () => {
      if (!document.pointerLockElement) setTourActive(false)
    }
    document.addEventListener('pointerlockchange', handler)
    return () => document.removeEventListener('pointerlockchange', handler)
  }, [])

  return (
    <div className="w-full h-full flex">
      {/* Unit panel */}
      <div className="w-56 bg-stone-900 p-5 flex flex-col border-r border-stone-700 flex-shrink-0">
        <h3
          className="text-stone-200 text-xl mb-1"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Apartments
        </h3>
        <p className="text-stone-500 text-[10px] tracking-widest mb-5 uppercase">Select Unit</p>

        {/* Unit buttons */}
        <div className="space-y-1.5">
          {units.map((u, i) => (
            <button
              key={u.id}
              onClick={() => { setSelectedUnit(i); setTourActive(false) }}
              className={`w-full py-2.5 px-4 text-left text-[11px] tracking-wide transition-all ${
                selectedUnit === i
                  ? 'bg-stone-700 text-white border-l-2 border-amber-500 pl-3'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              {u.name}
            </button>
          ))}
        </div>

        {/* Unit info */}
        <motion.div
          key={selectedUnit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 space-y-3"
        >
          {[
            { label: 'TYPE', value: unit.type },
            { label: 'AREA', value: unit.area },
            { label: 'FLOOR', value: unit.floor },
            { label: 'PRICE', value: unit.price },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-stone-500 text-[10px] tracking-widest">{label}</p>
              <p className="text-stone-300 text-[12px] mt-0.5">{value}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-auto space-y-2">
          <button className="w-full py-2.5 bg-amber-800 hover:bg-amber-700 text-white text-[10px] tracking-widest transition-colors">
            ENQUIRE NOW
          </button>
          <button className="w-full py-2.5 bg-stone-700 hover:bg-stone-600 text-stone-200 text-[10px] tracking-widest transition-colors">
            SCHEDULE VISIT
          </button>
        </div>
      </div>

      {/* 3D canvas */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 1.7, 3], fov: 72, near: 0.05, far: 80 }}
          shadows
          gl={{ antialias: true }}
          style={{ background: '#111' }}
        >
          <Suspense fallback={null}>
            <TourScene controlsRef={controlsRef} />
          </Suspense>
        </Canvas>

        {/* Overlay — before tour starts */}
        {!tourActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/65 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center px-8"
            >
              <p className="text-stone-400 text-[10px] tracking-widest mb-2 uppercase">Virtual Tour</p>
              <h3
                className="text-white text-3xl mb-1"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {unit.name}
              </h3>
              <p className="text-stone-300 text-sm mb-1">{unit.type} · {unit.area}</p>
              <p className="text-amber-400 text-[11px] tracking-widest mb-8">{unit.price}</p>
              <button
                onClick={startTour}
                className="px-8 py-3 bg-stone-800/90 hover:bg-stone-700 border border-stone-500 hover:border-amber-500 text-white text-[11px] tracking-widest transition-all"
              >
                ENTER VIRTUAL TOUR
              </button>
              <p className="text-stone-600 text-[10px] mt-5 tracking-wide">
                Click to lock cursor · WASD to walk · ESC to exit
              </p>
            </motion.div>
          </div>
        )}

        {/* Crosshair */}
        {tourActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-5 h-5 relative opacity-60">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-0.5" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white -translate-x-0.5" />
            </div>
          </div>
        )}

        {/* HUD instructions */}
        {tourActive && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-stone-900/75 text-stone-400 text-[10px] px-5 py-2 tracking-widest">
            W A S D — WALK · MOUSE — LOOK · ESC — EXIT
          </div>
        )}
      </div>
    </div>
  )
}
