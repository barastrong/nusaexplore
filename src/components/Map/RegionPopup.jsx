export default function RegionPopup({ regionName, onClose }) {
  return (
    <div className="region-popup-overlay" onClick={onClose}>
      <div className="region-popup" onClick={(e) => e.stopPropagation()}>
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
            <button className="popup-btn-primary">
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
