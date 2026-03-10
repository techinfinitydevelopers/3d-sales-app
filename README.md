# 3D Real Estate Sales App

A luxury real estate sales experience built with React, Vite, and Three.js — featuring a 360° panoramic site view, first-person apartment virtual tour, interactive floor plans, photo gallery, and location map.

## ✅ Status

* ✅ Panoramic 360° view rendering with kalyan-tharwani.JPG
* ✅ Drag-to-rotate working
* ✅ No errors from current code
* ✅ All 5 nav sections functional

## Features

| Section | Description |
|---|---|
| **Views** | 360° panoramic site view — drag to look around |
| **Locations** | Stylized map with landmark connectivity |
| **Floor Plans** | SVG floor plans for 3 BHK & 4 BHK Duplex units |
| **Gallery** | Photo grid with fullscreen lightbox |
| **Apartments** | First-person Three.js virtual tour (WASD + mouse) |

## Tech Stack

- **React 18** + **Vite**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:5173`

## Adding Your Panorama

Place your equirectangular panoramic image in the `public/` folder and update the filename in `src/components/views/ExteriorView.jsx`:

```js
'/kalyan-tharwani.JPG'
```

## Project Structure

```
src/
├── App.jsx
├── index.css
├── main.jsx
├── data/
│   └── projectData.js
└── components/
    ├── Sidebar.jsx
    ├── NavTabs.jsx
    ├── BottomBar.jsx
    └── views/
        ├── ExteriorView.jsx
        ├── LocationsView.jsx
        ├── FloorPlansView.jsx
        ├── GalleryView.jsx
        └── ApartmentsView.jsx
public/
└── kalyan-tharwani.JPG
```
