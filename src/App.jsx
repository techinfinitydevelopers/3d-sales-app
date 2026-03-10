import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import NavTabs from './components/NavTabs'
import BottomBar from './components/BottomBar'
import ExteriorView from './components/views/ExteriorView'
import LocationsView from './components/views/LocationsView'
import FloorPlansView from './components/views/FloorPlansView'
import GalleryView from './components/views/GalleryView'
import ApartmentsView from './components/views/ApartmentsView'

const views = {
  exterior: ExteriorView,
  locations: LocationsView,
  floorplans: FloorPlansView,
  gallery: GalleryView,
  apartments: ApartmentsView,
}

export default function App() {
  const [activeView, setActiveView] = useState('exterior')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  const View = views[activeView]

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-900 relative">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="w-72 flex-shrink-0 z-20"
          >
            <Sidebar activeView={activeView} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Nav Tabs */}
      <NavTabs activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <View />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <BottomBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        fullscreen={fullscreen}
        toggleFullscreen={toggleFullscreen}
        setActiveView={setActiveView}
      />
    </div>
  )
}
