import { useNavigate } from 'react-router-dom';

export default function RegionPopup({ regionName, onClose }) {
  const navigate = useNavigate();
  
  const handleDetailClick = () => {
    console.log('=== REGION POPUP DEBUG ===');
    console.log('Region Name:', regionName);
    
    // Convert region name to slug format
    const slug = regionName.toLowerCase().replace(/\s+/g, '-');
    console.log('Generated Slug:', slug);
    
    const targetUrl = `/detailmap/${slug}`;
    console.log('Target URL:', targetUrl);
    console.log('Navigating...');
    
    // Close popup first
    onClose();
    
    // Then navigate
    setTimeout(() => {
      navigate(targetUrl);
      console.log('Navigation executed!');
    }, 100);
  };
  
  return (
    <div className="region-popup-overlay" onClick={onClose}>
      <div className="region-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="popup-header">
          <div className="popup-title-section">
            <h3 className="popup-title">{regionName}</h3>
          </div>
        </div>
        
        <div className="popup-content">
          <p className="popup-detail-text">
            Informasi detail mengenai budaya, geografis, dan potensi daerah {regionName} akan ditampilkan di sini.
          </p>

          <div className="popup-actions">
            <button className="popup-btn-primary" onClick={handleDetailClick}>
              Lihat Detail Provinsi →
            </button>
            <button className="popup-btn-secondary" onClick={onClose}>
              ← Kembali ke Peta Utama
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
