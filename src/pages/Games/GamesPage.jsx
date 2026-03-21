import { useState } from 'react';
import QuizGame from './QuizGame';
import PuzzleGame from './PuzzleGame';
import '../../styles/games.css';

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div className="games-page">
      <div className="games-header">
        <div className="section-label">Mini Games</div>
        <h2 className="games-title">Belajar Sambil <em>Bermain</em></h2>
        <p className="games-sub">Dua game seru untuk menguji dan memperdalam pengetahuanmu tentang budaya Indonesia.</p>
      </div>

      {!activeGame && (
        <div className="games-select">
          <div className="game-select-card">
            <div className="gsc-top" style={{background:'linear-gradient(135deg,#0A1A14,#1A4A30)'}}>
              <div className="gsc-badge b-quiz">Quiz Budaya</div>
              <div className="gsc-icon" style={{background:'rgba(45,155,94,0.2)'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#40916C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
            </div>
            <div className="gsc-body">
              <div className="gsc-title">Quiz Budaya Indonesia</div>
              <div className="gsc-desc">Jawab 10 pertanyaan tentang budaya, sejarah, dan tradisi Indonesia. Seberapa dalam pengetahuanmu?</div>
              <div className="gsc-pills">
                <span className="gsc-pill">10 Soal</span>
                <span className="gsc-pill">Pilihan Ganda</span>
                <span className="gsc-pill">Berbagai Topik</span>
                <span className="gsc-pill">Skor Akhir</span>
              </div>
              <button className="gsc-cta" onClick={() => setActiveGame('quiz')}>Mulai Quiz</button>
            </div>
          </div>

          <div className="game-select-card">
            <div className="gsc-top" style={{background:'linear-gradient(135deg,#1A1508,#3D2E08)'}}>
              <div className="gsc-badge b-puzzle">Puzzle</div>
              <div className="gsc-icon" style={{background:'rgba(201,168,76,0.15)'}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </div>
            </div>
            <div className="gsc-body">
              <div className="gsc-title">Puzzle Nusantara</div>
              <div className="gsc-desc">Susun kepingan gambar budaya Indonesia menjadi gambar yang sempurna. Semakin cepat, semakin tinggi skormu!</div>
              <div className="gsc-pills">
                <span className="gsc-pill">Klik & Tukar</span>
                <span className="gsc-pill">3x3 Grid</span>
                <span className="gsc-pill">Berbagai Tema</span>
                <span className="gsc-pill">Hitung Langkah</span>
              </div>
              <button className="gsc-cta" onClick={() => setActiveGame('puzzle')}>Mulai Puzzle</button>
            </div>
          </div>
        </div>
      )}

      {activeGame === 'quiz' && <QuizGame onBack={() => setActiveGame(null)} />}
      {activeGame === 'puzzle' && <PuzzleGame onBack={() => setActiveGame(null)} />}
    </div>
  );
}
