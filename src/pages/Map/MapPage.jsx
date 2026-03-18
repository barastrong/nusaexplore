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
  const [zoomCenterX, setZoomCenterX] = useState(420); // Default center of SVG viewBox
  const [zoomCenterY, setZoomCenterY] = useState(170);
  
  const hoveredRegion = hoveredRegionId ? regionData[regionToIslandMap[hoveredRegionId]] : null;
  const selectedRegion = selectedRegionId ? regionData[regionToIslandMap[selectedRegionId]] : null;

  const showRegion = (id) => {
    setHoveredRegionId(id);
  };

  const closeDetail = () => {
    setHoveredRegionId(null);
    setSelectedRegionId(null);
    setSelectedRegionName(null);
    setZoom(1);
    setZoomCenterX(420);
    setZoomCenterY(170);
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
    setZoom(3);
    setZoomCenterX(centerX);
    setZoomCenterY(centerY);
  };

  return (
    <div className="map-page">
      <div className="map-hero">
        <div className="map-hero-inner">
          <div>
            <div className="section-label">Peta Interaktif</div>
            <h2 className="map-info-title">Jelajahi <em>Indonesia</em></h2>
          </div>
          <div className="map-container full-map">
            <MapSVG 
              onRegionHover={showRegion} 
              hoveredRegionId={hoveredRegionId}
              onRegionClick={handleRegionClick}
              selectedRegionId={selectedRegionId}
              zoom={zoom}
              zoomCenterX={zoomCenterX}
              zoomCenterY={zoomCenterY}
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
