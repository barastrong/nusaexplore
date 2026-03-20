import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { FiKey, FiInfo, FiX, FiAward, FiMap, FiGift, FiSearch, FiUnlock, FiBookOpen, FiStar } from 'react-icons/fi';
import { regionData, regionToIslandMap } from '../../data/regionData';
import { getUserData, updateUserData, unlockRegion as unlockRegionLS, addKeys } from '../../utils/localStorage';
import MapSVG from './/Map/MapSVG';
import RegionPopup from './Map/RegionPopup';
import LockedRegionPopup from './Map/LockedRegionPopup';
import '../../styles/map.css';

// Difficulty config
const DIFFICULTY_CONFIG = {
  mudah:  { unlockCost: 1, keyReward: 1, label: 'Mudah',  color: '#40916C' },
  sedang: { unlockCost: 2, keyReward: 1, label: 'Sedang', color: '#C9A84C' },
  susah:  { unlockCost: 3, keyReward: 2, label: 'Susah',  color: '#e74c3c' },
};

const regionDifficulty = {
  'aceh': 'mudah', 'sumatera-utara': 'mudah', 'dki-jakarta': 'mudah',
  'jawa-barat': 'mudah', 'jawa-timur': 'mudah', 'bali': 'mudah',
  'yogyakarta': 'mudah', 'riau': 'mudah', 'jawa-tengah': 'mudah',
  'sumatera-barat': 'sedang', 'sumatera-selatan': 'sedang', 'bengkulu': 'sedang',
  'lampung': 'sedang', 'jambi': 'sedang', 'banten': 'sedang',
  'bangka-belitung': 'sedang', 'kepulauan-riau': 'sedang',
  'nusa-tenggara-barat': 'sedang', 'nusa-tenggara-timur': 'sedang',
  'kalimantan-barat': 'sedang', 'kalimantan-selatan': 'sedang',
  'sulawesi-utara': 'sedang', 'sulawesi-tengah': 'sedang',
  'sulawesi-selatan': 'sedang', 'sulawesi-tenggara': 'sedang',
  'sulawesi-barat': 'sedang', 'maluku': 'sedang',
  'kalimantan-tengah': 'susah', 'kalimantan-timur': 'susah',
  'kalimantan-utara': 'susah', 'maluku-utara': 'susah',
  'gorontalo': 'susah', 'papua-barat': 'susah', 'papua-barat-daya': 'susah',
  'papua-tengah': 'susah', 'papua-selatan': 'susah',
  'papua-pegunungan': 'susah', 'papua': 'susah'
};

export const getDifficultyInfo = (regionId) => {
  const diff = regionDifficulty[regionId] || 'sedang';
  return { difficulty: diff, ...DIFFICULTY_CONFIG[diff] };
};

const TOTAL_PROVINCES = 38;

export default function MapPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hoveredRegionId, setHoveredRegionId] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedRegionName, setSelectedRegionName] = useState(null);
  const [lockedRegionNamePopup, setLockedRegionNamePopup] = useState(null);
  const [lockedRegionIdPopup, setLockedRegionIdPopup] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [zoomCenterX, setZoomCenterX] = useState(403.5);
  const [zoomCenterY, setZoomCenterY] = useState(170);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [unlockedRegions, setUnlockedRegions] = useState([]);
  const [keyValue, setKeyValue] = useState(() => {
    const userData = getUserData();
    return userData.keys;
  });
  const [lockedRegionKeyCost, setLockedRegionKeyCost] = useState(1);
  const [showHowToPlay, setShowHowToPlay] = useState(true);
  const [freeKeyUsed, setFreeKeyUsed] = useState(false);

  const selectedRegion = selectedRegionId ? regionData[regionToIslandMap[selectedRegionId]] : null;

  // Load data from localStorage on mount
  useEffect(() => {
    const userData = getUserData();
    console.log('🎮 [MapPage] Loading user data on mount:', userData);
    setUnlockedRegions(userData.unlockedRegions);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const showRegion = (id) => setHoveredRegionId(id);

  const closeDetail = () => {
    // Smooth zoom out
    setZoom(1);
    setPanX(0);
    setPanY(0);
    
    // Reset state setelah animasi selesai
    setTimeout(() => {
      setHoveredRegionId(null);
      setSelectedRegionId(null);
      setSelectedRegionName(null);
      setZoomCenterX(403.5);
      setZoomCenterY(170);
    }, 600);
  };

  const handleRegionClick = (regionId, regionName, centerX, centerY) => {
    setSelectedRegionId(regionId);
    setSelectedRegionName(regionName);
    const targetZoom = 2.5;
    const viewBoxCenterX = 403.5;
    const viewBoxCenterY = 170;
    const offsetX = (viewBoxCenterX - centerX) / targetZoom;
    const offsetY = (viewBoxCenterY - centerY) / targetZoom;
    setZoom(targetZoom);
    setZoomCenterX(centerX);
    setZoomCenterY(centerY);
    setPanX(offsetX);
    setPanY(offsetY);
  };

  const handleLockedRegionClick = (regionId, regionName) => {
    const { unlockCost } = getDifficultyInfo(regionId);
    setSelectedRegionName(null);
    setSelectedRegionId(null);
    setLockedRegionNamePopup(regionName);
    setLockedRegionIdPopup(regionId);
    setLockedRegionKeyCost(unlockCost);
  };

  const handleUnlockRegion = (regionId, keyCost) => {
    console.log('🔓 [MapPage] Attempting to unlock:', regionId, 'Cost:', keyCost);
    const success = unlockRegionLS(regionId, keyCost);
    if (success) {
      const userData = getUserData();
      setKeyValue(userData.keys);
      setUnlockedRegions(userData.unlockedRegions);
      if (!freeKeyUsed) setFreeKeyUsed(true);
      setLockedRegionNamePopup(null);
      setLockedRegionIdPopup(null);
      console.log('✅ [MapPage] Region unlocked successfully');
    } else {
      console.log('❌ [MapPage] Failed to unlock region');
    }
  };

  // Called when user completes/visits a province — reward keys
  const handleProvinceComplete = (regionId) => {
    const { keyReward } = getDifficultyInfo(regionId);
    console.log('🎁 [MapPage] Province completed:', regionId, 'Reward:', keyReward);
    addKeys(keyReward);
    const userData = getUserData();
    setKeyValue(userData.keys);
  };

  if (loading) {
    return (
      <div className="map-loading">
        <ClipLoader
          color="#f7b24f"
          loading={loading}
          size={60}
          aria-label="Loading Spinner"
        />
        <p className="map-loading-text">Memuat Peta...</p>
      </div>
    );
  }

  const unlockedCount = unlockedRegions.length;
  const isFullMapComplete = unlockedCount >= TOTAL_PROVINCES;

  return (
    <div className="map-page">
      <div className="map-hero">
        <div className="map-hero-header">
          <div className="section-label">Map Game</div>
          <h2 className="map-info-title">Jelajahi <em>Indonesia</em></h2>
          <div className="map-progress-bar">
            <div className="map-progress-fill" style={{ width: `${(unlockedCount / TOTAL_PROVINCES) * 100}%` }} />
            <span className="map-progress-text">{unlockedCount}/{TOTAL_PROVINCES} Provinsi</span>
          </div>
        </div>

        {isFullMapComplete && (
          <div className="fullmap-complete-banner">
            <FiAward /> Selamat! Kamu telah membuka semua provinsi!
          </div>
        )}

        {/* Top-right controls: Cara Bermain + Kembali */}
        <div className="map-top-right">
          <div className="htp-wrapper">
            <button className="htp-trigger-btn" onClick={() => setShowHowToPlay(v => !v)}>
              <FiInfo />
              <span>Cara Bermain</span>
            </button>

            {showHowToPlay && (
              <div className="how-to-play-panel">
                <button className="htp-close" onClick={() => setShowHowToPlay(false)}><FiX /></button>

                {/* Header */}
                <div className="htp-header">
                  <div className="htp-header-icon"><FiMap /></div>
                  <div>
                    <div className="htp-header-title">Map Explorer</div>
                    <div className="htp-header-sub">Buka semua 38 provinsi Indonesia!</div>
                  </div>
                </div>

                {/* Free key notice */}
                <div className="htp-notice">
                  <span className="htp-notice-icon"><FiGift /></span>
                  <span>Kamu dapat <strong>1 kunci gratis</strong> untuk memulai petualangan!</span>
                </div>

                {/* Flow steps */}
                <div className="htp-flow">
                  <div className="htp-step">
                    <div className="htp-step-dot">1</div>
                    <div className="htp-step-line" />
                    <div className="htp-step-content">
                      <div className="htp-step-title"><FiSearch className="htp-step-icon" /> Pilih Provinsi</div>
                      <div className="htp-step-desc">Klik provinsi terkunci di peta</div>
                    </div>
                  </div>
                  <div className="htp-step">
                    <div className="htp-step-dot">2</div>
                    <div className="htp-step-line" />
                    <div className="htp-step-content">
                      <div className="htp-step-title"><FiUnlock className="htp-step-icon" /> Gunakan Kunci</div>
                      <div className="htp-step-desc">Bayar kunci sesuai level provinsi</div>
                    </div>
                  </div>
                  <div className="htp-step">
                    <div className="htp-step-dot">3</div>
                    <div className="htp-step-line" />
                    <div className="htp-step-content">
                      <div className="htp-step-title"><FiBookOpen className="htp-step-icon" /> Jelajahi Detail</div>
                      <div className="htp-step-desc">Baca budaya & info provinsi</div>
                    </div>
                  </div>
                  <div className="htp-step">
                    <div className="htp-step-dot">4</div>
                    <div className="htp-step-line htp-step-line--last" />
                    <div className="htp-step-content">
                      <div className="htp-step-title"><FiStar className="htp-step-icon" /> Dapat Reward</div>
                      <div className="htp-step-desc">Terima kunci baru, buka provinsi berikutnya!</div>
                    </div>
                  </div>
                </div>

                {/* Level table */}
                <div className="htp-level-table">
                  <div className="htp-level-header">Level Provinsi</div>
                  {Object.entries(DIFFICULTY_CONFIG).map(([key, cfg]) => (
                    <div key={key} className="htp-level-row">
                      <span className="htp-badge" style={{ background: cfg.color + '22', color: cfg.color, border: `1px solid ${cfg.color}` }}>{cfg.label}</span>
                      <span className="htp-level-cost">Buka <strong>{cfg.unlockCost} <FiKey style={{ verticalAlign: 'middle', fontSize: 11 }} /></strong></span>
                      <span className="htp-level-reward">+{cfg.keyReward} <FiKey style={{ verticalAlign: 'middle', fontSize: 11 }} /> reward</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="map-back-btn" onClick={() => navigate('/')}>
            ← Kembali
          </button>
        </div>
        <div className="map-hero-inner">
          <div className="map-container full-map">
            <MapSVG 
              onRegionHover={showRegion} 
              hoveredRegionId={hoveredRegionId}
              onRegionClick={handleRegionClick}
              onLockedRegionClick={handleLockedRegionClick}
              selectedRegionId={selectedRegionId}
              zoom={zoom}
              zoomCenterX={zoomCenterX}
              zoomCenterY={zoomCenterY}
              panX={panX}
              panY={panY}
              unlockedRegions={unlockedRegions}
              keyValue={keyValue}
            />
          </div>
        </div>
      </div>

      {selectedRegion && selectedRegionName && (
        <RegionPopup 
          regionName={selectedRegionName}
          regionId={selectedRegionId}
          onClose={closeDetail}
          onComplete={handleProvinceComplete}
        />
      )}

      {lockedRegionNamePopup && (
        <LockedRegionPopup
          regionName={lockedRegionNamePopup}
          regionId={lockedRegionIdPopup}
          onClose={() => setLockedRegionNamePopup(null)}
          onUnlock={() => handleUnlockRegion(lockedRegionIdPopup, lockedRegionKeyCost)}
          keyValue={keyValue}
          keyRequired={lockedRegionKeyCost}
        />
      )}
    </div>
  );
}
