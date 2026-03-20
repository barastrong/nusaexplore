import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MapPage from './pages/Map/MapPage';
import DetailMapPage from './pages/Map/DetailMapPage';
import Footer from './components/Footer';
import GamesPage from './pages/Games/GamesPage';
import MapsPage from './pages/Games/MapPage';
import MapsPageDetail  from './pages/Games/DetailMapPage'

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/map' || location.pathname.startsWith('/detailmap/') || location.pathname === '/map-games' || location.pathname.startsWith('/map-games-detail/');
  const hideNavbar = location.pathname === '/map' || location.pathname.startsWith('/detailmap/') || location.pathname === '/map-games' || location.pathname.startsWith('/map-games-detail/');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/detailmap/:name" element={<DetailMapPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/map-games" element={<MapsPage />} />
        <Route path="/map-games-detail/:name" element={<MapsPageDetail />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
