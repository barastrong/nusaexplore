import { useState, useEffect } from 'react';
import { puzzleData } from '../../data/puzzleData';

export default function PuzzleGame({ onBack }) {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [state, setState] = useState([]);
  const [moves, setMoves] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    initPuzzle();
  }, [currentPuzzle]);

  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const initPuzzle = () => {
    setMoves(0);
    setSelected(-1);
    setComplete(false);
    const puzzle = puzzleData[currentPuzzle];
    setState(shuffleArray([...puzzle.emoji]));
  };

  const selectPiece = (i) => {
    if (complete) return;
    if (selected === -1) {
      setSelected(i);
    } else {
      if (selected === i) {
        setSelected(-1);
        return;
      }
      const newState = [...state];
      [newState[selected], newState[i]] = [newState[i], newState[selected]];
      setState(newState);
      setMoves(moves + 1);
      setSelected(-1);
      checkComplete(newState);
    }
  };

  const checkComplete = (currentState) => {
    const puzzle = puzzleData[currentPuzzle];
    if (currentState.every((e, i) => e === puzzle.correct[i])) {
      setComplete(true);
    }
  };

  const checkPuzzle = () => {
    const puzzle = puzzleData[currentPuzzle];
    const elements = document.querySelectorAll('.puzzle-piece');
    elements.forEach((el, i) => {
      el.classList.remove('correct', 'wrong-place');
      if (state[i] === puzzle.correct[i]) {
        el.classList.add('correct');
      } else {
        el.classList.add('wrong-place');
      }
    });
    setTimeout(() => {
      elements.forEach(el => el.classList.remove('wrong-place'));
    }, 1500);
  };

  const shufflePuzzle = () => {
    const puzzle = puzzleData[currentPuzzle];
    setState(shuffleArray([...puzzle.emoji]));
    setMoves(0);
  };

  const resetPuzzle = () => {
    setCurrentPuzzle((currentPuzzle + 1) % puzzleData.length);
  };

  const puzzle = puzzleData[currentPuzzle];

  return (
    <div className="puzzle-game show">
      <div className="puzzle-header">
        <button className="quiz-back" onClick={onBack}>← Kembali</button>
        <div className="quiz-title">Puzzle Nusantara 🧩</div>
      </div>
      <div className="puzzle-board">
        <div className="puzzle-img-label">{puzzle.title}</div>
        <div className="puzzle-img-sub">Susun kepingan menjadi gambar yang benar!</div>
        <div className="puzzle-info">
          <div className="puzzle-moves">Langkah: <span>{moves}</span></div>
        </div>
        <div className="puzzle-grid" style={{gridTemplateColumns: 'repeat(3,1fr)'}}>
          {state.map((emoji, i) => (
            <div
              key={i}
              className={`puzzle-piece ${selected === i ? 'selected' : ''} ${complete ? 'correct' : ''}`}
              onClick={() => selectPiece(i)}
            >
              {emoji}
            </div>
          ))}
        </div>
        {complete && (
          <div className="puzzle-complete show">
            <div className="puzzle-complete-title">Selesai!</div>
            <div className="puzzle-complete-sub">
              Kamu menyelesaikan puzzle dalam <strong style={{color:'var(--gold)'}}>{moves}</strong> langkah!
            </div>
            <button className="puz-btn primary" onClick={resetPuzzle}>Puzzle Baru</button>
          </div>
        )}
        <div className="puzzle-actions">
          <button className="puz-btn" onClick={shufflePuzzle}>Acak Ulang</button>
          <button className="puz-btn" onClick={resetPuzzle}>Ganti Tema</button>
          <button className="puz-btn primary" onClick={checkPuzzle}>Cek Jawaban</button>
        </div>
      </div>
    </div>
  );
}
