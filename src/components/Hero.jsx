import { useNavigate } from 'react-router-dom';
import '../styles/hero.css';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">Platform Edukasi Budaya Indonesia</div>
        <h1 className="hero-title">
          Jelajahi<br />
          <em>Warisan</em><br />
          <span className="outline">Nusantara</span>
        </h1>
        <p className="hero-desc">
          Dari batik Jawa hingga tarian Papua — temukan keajaiban budaya 17.000 pulau Indonesia lewat peta interaktif dan game edukatif yang seru.
        </p>
        <div className="hero-actions">
          <button className="btn-gold" onClick={() => navigate('/map')}>Mulai Eksplorasi</button>
          <button className="btn-outline" onClick={() => navigate('/games')}>Coba Games</button>
        </div>
        <div className="hero-stats">
          <div><div className="stat-num">1,340+</div><div className="stat-label">Suku Bangsa</div></div>
          <div><div className="stat-num">746</div><div className="stat-label">Bahasa Daerah</div></div>
          <div><div className="stat-num">34</div><div className="stat-label">Provinsi</div></div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-img-main">
          <div className="img-placeholder p1">
            <div>Batik Nusantara</div>
          </div>
          <div className="img-tag">Seni Tekstil · Warisan UNESCO</div>
        </div>
        <div className="hero-badge">Warisan Dunia</div>
        <div className="hero-img-sm1">
          <div className="img-placeholder p2">
            <div>Wayang Kulit</div>
          </div>
          <div className="img-tag">Tradisi · 1,000 Tahun</div>
        </div>
        <div className="hero-img-sm2">
          <div className="img-placeholder p3">
            <div>Candi Agung</div>
          </div>
          <div className="img-tag">Sejarah</div>
        </div>
      </div>
    </section>
  );
}
