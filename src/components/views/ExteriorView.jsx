import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

function Panorama360({ texture }) {
  return (
    <mesh>
      <sphereGeometry args={[100, 64, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

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

function Scene() {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    new THREE.TextureLoader().load(
      '/kalyan-tharwani.JPG',
      (tex) => { tex.colorSpace = THREE.SRGBColorSpace; setTexture(tex) },
      undefined,
      () => {}
    )
  }, [])

  return (
    <>
      {texture && <Panorama360 texture={texture} />}
      <ambientLight intensity={1} />

      <HotspotLabel label="ROOFTOP INFINITY POOL"  position={[0, 30, -80]} />
      <HotspotLabel label="SKY LOUNGE & BAR"        position={[60, 20, -60]} />
      <HotspotLabel label="ARENA — THE PODIUM"      position={[80, -10, -30]} />
      <HotspotLabel label="LOBBY DROP-OFF"           position={[-70, -15, -40]} />

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

export default function ExteriorView() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 90 }}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>

      <div className="absolute top-4 right-16 text-white/60 text-[10px] tracking-widest pointer-events-none drop-shadow">
        DRAG TO LOOK AROUND · 360° VIEW
      </div>
    </div>
  )
}
