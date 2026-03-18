import { useState } from 'react';
import { regionData, regionToIslandMap } from '../../data/regionData';
import MapSVG from '../../components/Map/MapSVG';
import RegionPopup from '../../components/Map/RegionPopup';
import '../../styles/map.css';

export default function MapPage() {
  const [hoveredRegionId, setHoveredRegionId] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedRegionName, setSelectedRegionName] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [zoomCenterX, setZoomCenterX] = useState(420);
  const [zoomCenterY, setZoomCenterY] = useState(170);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  
  const hoveredRegion = hoveredRegionId ? regionData[regionToIslandMap[hoveredRegionId]] : null;
  const selectedRegion = selectedRegionId ? regionData[regionToIslandMap[selectedRegionId]] : null;

  const showRegion = (id) => {
    setHoveredRegionId(id);
  };

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
      setZoomCenterX(420);
      setZoomCenterY(170);
    }, 600);
  };

  const handleRegionClick = (regionId, regionName, centerX, centerY) => {
    console.log('Path yang ditekan:', {
      id: regionId,
      name: regionName,
      centerX,
      centerY
    });
    setSelectedRegionId(regionId);
    setSelectedRegionName(regionName);
    
    // Smooth zoom dengan center ke region yang diklik
    const targetZoom = 2.5;
    const viewBoxCenterX = 420;
    const viewBoxCenterY = 170;
    
    // Hitung offset untuk center ke region
    const offsetX = (viewBoxCenterX - centerX) * targetZoom;
    const offsetY = (viewBoxCenterY - centerY) * targetZoom;
    
    setZoom(targetZoom);
    setZoomCenterX(centerX);
    setZoomCenterY(centerY);
    setPanX(offsetX);
    setPanY(offsetY);
  };

  return (
    <div className="map-page">
      <div className="map-hero">
        <div className="map-hero-header">
          <div className="section-label">Peta Interaktif</div>
          <h2 className="map-info-title">Jelajahi <em>Indonesia</em></h2>
        </div>
        <div className="map-hero-inner">
          <div className="map-container full-map">
            <MapSVG 
              onRegionHover={showRegion} 
              hoveredRegionId={hoveredRegionId}
              onRegionClick={handleRegionClick}
              selectedRegionId={selectedRegionId}
              zoom={zoom}
              zoomCenterX={zoomCenterX}
              zoomCenterY={zoomCenterY}
              panX={panX}
              panY={panY}
            />
          </div>
        </div>
      </div>

      {selectedRegion && selectedRegionName && (
        <RegionPopup 
          regionName={selectedRegionName}
          onClose={closeDetail}
        />
      )}


    </div>
  );
}
