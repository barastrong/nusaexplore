# NusaExplore - Platform Edukasi Budaya Indonesia

Platform interaktif untuk menjelajahi kekayaan budaya Indonesia dengan peta interaktif dan game edukatif.

## 🚀 Teknologi

- React 19.2.4
- React Router DOM 7.13.1
- Vite 8.0.0

## 📁 Struktur Project

```
src/
├── components/          # Komponen reusable
│   ├── Map/            # Komponen peta
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Marquee.jsx
│   ├── CultureGrid.jsx
│   ├── Features.jsx
│   ├── Quote.jsx
│   ├── CTA.jsx
│   └── Footer.jsx
├── pages/              # Halaman utama
│   ├── HomePage.jsx
│   ├── Map/
│   │   └── MapPage.jsx
│   └── Games/
│       ├── GamesPage.jsx
│       ├── QuizGame.jsx
│       └── PuzzleGame.jsx
├── data/               # Data dummy
│   ├── regionData.js
│   ├── quizData.js
│   └── puzzleData.js
└── styles/             # CSS per komponen
    ├── theme.css
    ├── navbar.css
    ├── hero.css
    ├── marquee.css
    ├── culture.css
    ├── features.css
    ├── map.css
    ├── games.css
    └── sections.css
```

## 🎨 Fitur

1. **Peta Interaktif** - Jelajahi budaya Indonesia per wilayah
2. **Quiz Budaya** - Uji pengetahuan tentang budaya Indonesia
3. **Puzzle Nusantara** - Susun kepingan gambar budaya
4. **Dark/Light Mode** - Toggle tema sesuai preferensi

## 🛠️ Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 📝 Catatan

- Data yang digunakan adalah data dummy untuk demonstrasi
- Peta menggunakan SVG sederhana untuk representasi wilayah Indonesia
- Semua komponen sudah terpisah untuk memudahkan maintenance

## 🎯 Cara Penggunaan

1. **Beranda** - Lihat overview platform
2. **Jelajah** - Klik wilayah di peta untuk melihat detail budaya
3. **Games** - Pilih Quiz atau Puzzle untuk bermain
4. **Theme Toggle** - Klik icon bulan/matahari di navbar

## 📄 License

MIT
