import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { provinceDetailData } from '../../data/provinceDetailData';
import { HiOutlineOfficeBuilding, HiOutlineUsers, HiOutlineMap, HiOutlineChatAlt2 } from 'react-icons/hi';
import { FiKey, FiCheckCircle } from 'react-icons/fi';
import { claimProvinceReward, hasClaimedReward } from '../../utils/localStorage';
import { getDifficultyInfo } from '../Games/MapPage';
import '../../styles/detailmap.css';

export default function DetailMapPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [province, setProvince] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [showClaimAnim, setShowClaimAnim] = useState(false);

  useEffect(() => {
    const foundProvince = provinceDetailData.find(
      p => p.slug === name || p.name.toLowerCase().replace(/\s+/g, '-') === name
    );
    if (foundProvince) {
      setProvince(foundProvince);
      setClaimed(hasClaimedReward(name));
    } else {
      setTimeout(() => navigate('/map-games'), 2000);
    }
  }, [name, navigate]);

  const handleClaim = () => {
    const { keyReward } = getDifficultyInfo(name);
    const success = claimProvinceReward(name, keyReward);
    if (success) {
      setClaimed(true);
      setShowClaimAnim(true);
      setTimeout(() => setShowClaimAnim(false), 2000);
    }
  };

  if (!province) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
        <p>Memuat data provinsi...</p>
      </div>
    );
  }

  return (
    <div className="detail-map-page">
      {/* Hero Section */}
      <section className="detail-hero" style={{ backgroundImage: `url(${province.heroImage})` }}>
        <div className="detail-hero-overlay"></div>
        <div className="detail-hero-content">
          <button className="detail-back-btn" onClick={() => navigate('/map-games')}>
            ← Kembali ke Peta
          </button>
          <div className="detail-hero-text">
            <span className="detail-badge">{province.region}</span>
            <h1 className="detail-title">{province.name}</h1>
            <p className="detail-subtitle">{province.tagline}</p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="detail-quick-info">
        <div className="detail-container">
          <div className="quick-info-grid">
            <div className="quick-info-card">
              <div className="quick-info-icon"><HiOutlineOfficeBuilding /></div>
              <div className="quick-info-content">
                <h3>Ibu Kota</h3>
                <p>{province.capital}</p>
              </div>
            </div>
            <div className="quick-info-card">
              <div className="quick-info-icon"><HiOutlineUsers /></div>
              <div className="quick-info-content">
                <h3>Populasi</h3>
                <p>{province.population}</p>
              </div>
            </div>
            <div className="quick-info-card">
              <div className="quick-info-icon"><HiOutlineMap /></div>
              <div className="quick-info-content">
                <h3>Luas Wilayah</h3>
                <p>{province.area}</p>
              </div>
            </div>
            <div className="quick-info-card">
              <div className="quick-info-icon"><HiOutlineChatAlt2 /></div>
              <div className="quick-info-content">
                <h3>Bahasa Daerah</h3>
                <p>{province.language}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="detail-about">
        <div className="detail-container">
          <div className="detail-section-header">
            <span className="section-label">Tentang</span>
            <h2>Sekilas {province.name}</h2>
          </div>
          <div className="about-content">
            <p>{province.description}</p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="detail-culture">
        <div className="detail-container">
          <div className="detail-section-header">
            <span className="section-label">Budaya</span>
            <h2>Kekayaan Budaya</h2>
          </div>
          <div className="media-grid">
            {province.culture.map((item, index) => (
              <div key={index} className="media-card">
                <div className="media-img" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="media-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tourism Section */}
      <section className="detail-tourism">
        <div className="detail-container">
          <div className="detail-section-header">
            <span className="section-label">Wisata</span>
            <h2>Destinasi Populer</h2>
          </div>
          <div className="media-grid">
            {province.tourism.map((place, index) => (
              <div key={index} className="media-card">
                <div className="media-img" style={{ backgroundImage: `url(${place.image})` }}>
                  <div className="media-overlay">
                    <h3>{place.name}</h3>
                    <p>{place.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Section */}
      <section className="detail-culinary">
        <div className="detail-container">
          <div className="detail-section-header">
            <span className="section-label">Kuliner</span>
            <h2>Makanan Khas</h2>
          </div>
          <div className="media-grid">
            {province.culinary.map((food, index) => (
              <div key={index} className="media-card">
                <div className="media-img" style={{ backgroundImage: `url(${food.image})` }}>
                  <div className="media-overlay">
                    <h3>{food.name}</h3>
                    <p>{food.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="detail-facts">
        <div className="detail-container">
          <div className="detail-section-header">
            <span className="section-label">Fakta Menarik</span>
            <h2>Tahukah Kamu?</h2>
          </div>
          <div className="facts-grid">
            {province.facts.map((fact, index) => (
              <div key={index} className="fact-card">
                <div className="fact-icon">✦</div>
                <div className="fact-index">{String(index + 1).padStart(2, '0')}</div>
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="detail-cta">
        <div className="detail-container">
          <div className="cta-content">
            <h2>Jelajahi Provinsi Lainnya</h2>
            <p>Temukan keunikan dan kekayaan budaya dari setiap provinsi di Indonesia</p>

            {/* Claim reward button */}
            <div className="claim-reward-box">
              {claimed ? (
                <div className="claim-reward-done">
                  <FiCheckCircle />
                  <span>Reward sudah diklaim</span>
                </div>
              ) : (
                <button className="claim-reward-btn" onClick={handleClaim}>
                  <FiKey />
                  <span>Klaim Reward +{getDifficultyInfo(name).keyReward} Kunci</span>
                </button>
              )}
              {showClaimAnim && (
                <div className="claim-reward-anim">+{getDifficultyInfo(name).keyReward} <FiKey /> Kunci berhasil diklaim!</div>
              )}
            </div>

            <button className="btn-gold" onClick={() => navigate('/map-games')}>
              Kembali ke Peta Indonesia
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
