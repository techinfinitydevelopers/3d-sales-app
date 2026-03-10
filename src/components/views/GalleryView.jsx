import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../../data/projectData'

export default function GalleryView() {
  const [lightbox, setLightbox] = useState(null)

  const prev = (e) => {
    e.stopPropagation()
    setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setLightbox((i) => (i + 1) % galleryImages.length)
  }

  return (
    <div className="w-full h-full bg-stone-900 overflow-y-auto">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-5">
          <h3
            className="text-stone-200 text-2xl"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Gallery
          </h3>
          <p className="text-stone-500 text-[10px] tracking-widest mt-1 uppercase">
            Interiors & Amenities
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative aspect-video overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/45 transition-all duration-300 flex items-end p-3">
                <span className="text-white text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/96 flex items-center justify-center z-50"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-5 right-5 text-stone-400 hover:text-white z-10 p-2"
              onClick={() => setLightbox(null)}
            >
              <X size={22} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white z-10 p-3"
              onClick={prev}
            >
              <ChevronLeft size={30} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white z-10 p-3"
              onClick={next}
            >
              <ChevronRight size={30} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].label}
                className="max-w-4xl max-h-[78vh] object-contain"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-stone-300 text-[11px] tracking-widest uppercase">
                {galleryImages[lightbox].label}
              </p>
              <p className="text-stone-600 text-[10px] mt-1">
                {lightbox + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
