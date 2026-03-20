import '../../../styles/map.css';
import { FiKey } from "react-icons/fi";

export default function LockedRegionPopup({ regionName, onClose, onUnlock, keyValue = 0, keyRequired = 100 }) {
  const canUnlock = keyValue >= keyRequired;
  const keysNeeded = keyRequired - keyValue;
  
  const handleUnlock = () => {
    if (canUnlock) {
      onUnlock();
      onClose();
    }
  };

  return (
    <div className="region-popup-overlay" onClick={onClose}>
      <div className="region-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-content">
          <h3 className="popup-title">Daerah Terkunci</h3>
          <p className="popup-section-title">{regionName}</p>
          <div className="popup-section">
            <p className="popup-text">Daerah ini membutuhkan kunci untuk diakses</p>
            <div className="key-requirement-box">
              <span className="key-icon"><FiKey /></span>
              <span className="key-amount">{keyRequired}</span>
            </div>
            {!canUnlock && (
              <p className="popup-text popup-warning" style={{ color: '#e74c3c', marginTop: '10px', fontSize: '12px' }}>
                Kamu membutuhkan {keysNeeded} kunci lagi
              </p>
            )}
            <p className="popup-text" style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              Kunci tersediamu: {keyValue}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="popup-btn-secondary" onClick={onClose} style={{ flex: 1 }}>
              Batal
            </button>
            <button 
              className="popup-btn-primary" 
              onClick={handleUnlock}
              disabled={!canUnlock}
              style={{
                flex: 1,
                opacity: canUnlock ? 1 : 0.5,
                cursor: canUnlock ? 'pointer' : 'not-allowed'
              }}
            >
              {canUnlock ? 'Buka Kunci' : 'Tidak Cukup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
