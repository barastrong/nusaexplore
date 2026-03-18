import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MapPage from './pages/Map/MapPage';
import Footer from './components/Footer';
import GamesPage from './pages/Games/GamesPage';

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/map';
  const hideNavbar = location.pathname === '/map';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/games" element={<GamesPage />} />
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
