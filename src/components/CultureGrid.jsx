import { useNavigate } from 'react-router-dom';
import '../styles/culture.css';

export default function CultureGrid() {
  const navigate = useNavigate();

  const cultures = [
    { id: 1, tag: 'Seni Tekstil · UNESCO', title: 'Batik — Lukisan Jiwa Jawa', sub: '3,000+ motif dari seluruh Nusantara', emoji: '🎨', className: 'c1 main' },
    { id: 2, tag: 'Seni Pertunjukan', title: 'Wayang Kulit', sub: '1,000 tahun tradisi', emoji: '🎭', className: 'c2' },
    { id: 3, tag: 'Sejarah', title: 'Candi & Kerajaan', sub: 'Jejak peradaban agung', emoji: '🏯', className: 'c3' },
    { id: 4, tag: 'Musik Tradisional', title: 'Gamelan', sub: 'Harmoni Nusantara', emoji: '🎵', className: 'c4' },
    { id: 5, tag: 'Kuliner & Rempah', title: 'Rempah Nusantara', sub: 'Bumbu yang mengubah dunia', emoji: '🌿', className: 'c5' }
  ];

  return (
    <section className="section reveal">
      <div className="culture-header">
        <div>
          <div className="section-label">Koleksi Budaya</div>
          <h2 className="section-title">Temukan <em>Keajaiban</em><br />di Setiap Sudut</h2>
        </div>
        <p className="section-sub">
          Setiap budaya punya cerita. Jelajahi koleksi seni, tradisi, dan warisan dari seluruh Nusantara — dikurasi untuk pengalaman belajar terbaik.
        </p>
      </div>
      <div className="culture-grid">
        {cultures.map(culture => (
          <div key={culture.id} className={`culture-card ${culture.className}`} onClick={() => navigate(culture.id === 1 || culture.id === 3 || culture.id === 5 ? '/map' : '/games')}>
            <div className={`cc-bg ${culture.className.split(' ')[0]}`}>
              <div className="big-emoji">{culture.emoji}</div>
            </div>
            <div className="cc-overlay"></div>
            <div className="cc-content">
              <div className="cc-tag">{culture.tag}</div>
              <div className="cc-title">{culture.title}</div>
              <div className="cc-sub">{culture.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
