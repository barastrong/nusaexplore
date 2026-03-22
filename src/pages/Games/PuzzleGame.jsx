import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { markGameCompleted, getUserData } from '../../utils/localStorage';
import '../../styles/puzzle.css';

const PUZZLE_DIFFICULTY = 4;
const PUZZLE_HOVER_TINT = '#009900';

const PUZZLE_IMAGES = [
  '/images/provinces/aceh-hero.jpg',
  '/images/provinces/bali-hero.jpg',
  '/images/provinces/jabar-hero.jpg',
];

export default function PuzzleGame({ onBack }) {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [showPuzzleList, setShowPuzzleList] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Game state refs
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const piecesRef = useRef([]);
  const puzzleWidthRef = useRef(0);
  const puzzleHeightRef = useRef(0);
  const oldPuzzleWidthRef = useRef(0);
  const oldPuzzleHeightRef = useRef(0);
  const originalPieceWidthRef = useRef(0);
  const originalPieceHeightRef = useRef(0);
  const pieceWidthRef = useRef(0);
  const pieceHeightRef = useRef(0);
  const currentPieceRef = useRef(null);
  const currentDropPieceRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Pilih puzzle acak saat pertama kali load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PUZZLE_IMAGES.length);
    setCurrentPuzzle(PUZZLE_IMAGES[randomIndex]);
  }, []);

  // Initialize puzzle when image changes
  useEffect(() => {
    if (!currentPuzzle) return;

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      originalPieceWidthRef.current = img.width / PUZZLE_DIFFICULTY;
      originalPieceHeightRef.current = img.height / PUZZLE_DIFFICULTY;
      pieceWidthRef.current = originalPieceWidthRef.current;
      pieceHeightRef.current = originalPieceHeightRef.current;
      puzzleWidthRef.current = img.width;
      puzzleHeightRef.current = img.height;
      
      setCanvas();
      initPuzzle();
      setGameWon(false);
    };
    img.src = currentPuzzle;
  }, [currentPuzzle]);

  const setCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    stageRef.current = canvas.getContext('2d');
    canvas.width = puzzleWidthRef.current;
    canvas.height = puzzleHeightRef.current;
  };

  const initPuzzle = () => {
    piecesRef.current = [];
    mouseRef.current = { x: 0, y: 0 };
    currentPieceRef.current = null;
    currentDropPieceRef.current = null;
    buildPieces();
  };

  const buildPieces = () => {
    const pieces = [];
    let xPos = 0;
    let yPos = 0;
    
    for (let i = 0; i < PUZZLE_DIFFICULTY * PUZZLE_DIFFICULTY; i++) {
      const piece = {
        sx: xPos,
        sy: yPos,
      };
      pieces.push(piece);
      xPos += pieceWidthRef.current;
      if (xPos >= puzzleWidthRef.current) {
        xPos = 0;
        yPos += pieceHeightRef.current;
      }
    }
    
    piecesRef.current = pieces;
    shufflePuzzle();
  };

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shufflePuzzle = () => {
    piecesRef.current = shuffleArray(piecesRef.current);
    const stage = stageRef.current;
    stage.clearRect(0, 0, puzzleWidthRef.current, puzzleHeightRef.current);
    
    let xPos = 0;
    let yPos = 0;
    
    piecesRef.current.forEach((piece) => {
      piece.xPos = xPos;
      piece.yPos = yPos;
      stage.drawImage(
        imgRef.current,
        piece.sx,
        piece.sy,
        originalPieceWidthRef.current,
        originalPieceHeightRef.current,
        xPos,
        yPos,
        pieceWidthRef.current,
        pieceHeightRef.current
      );
      stage.strokeRect(xPos, yPos, pieceWidthRef.current, pieceHeightRef.current);
      
      xPos += pieceWidthRef.current;
      if (xPos >= puzzleWidthRef.current) {
        xPos = 0;
        yPos += pieceHeightRef.current;
      }
    });
  };

  const checkPieceClicked = (mouseX, mouseY) => {
    for (let piece of piecesRef.current) {
      if (
        mouseX >= piece.xPos &&
        mouseX <= piece.xPos + pieceWidthRef.current &&
        mouseY >= piece.yPos &&
        mouseY <= piece.yPos + pieceHeightRef.current
      ) {
        return piece;
      }
    }
    return null;
  };

  const onPuzzleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if (e.type === 'mousedown') {
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    } else if (e.type === 'touchstart') {
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
    }

    currentPieceRef.current = checkPieceClicked(mouseRef.current.x, mouseRef.current.y);
    
    if (currentPieceRef.current) {
      const stage = stageRef.current;
      stage.clearRect(
        currentPieceRef.current.xPos,
        currentPieceRef.current.yPos,
        pieceWidthRef.current,
        pieceHeightRef.current
      );
      stage.save();
      stage.globalAlpha = 0.9;
      stage.drawImage(
        imgRef.current,
        currentPieceRef.current.sx,
        currentPieceRef.current.sy,
        originalPieceWidthRef.current,
        originalPieceHeightRef.current,
        mouseRef.current.x - pieceWidthRef.current / 2,
        mouseRef.current.y - pieceHeightRef.current / 2,
        pieceWidthRef.current,
        pieceHeightRef.current
      );
      stage.restore();
    }
  };

  const updatePuzzle = (e) => {
    if (!currentPieceRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if (e.type === 'mousemove') {
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    } else if (e.type === 'touchmove') {
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
    }

    currentDropPieceRef.current = null;
    const stage = stageRef.current;
    stage.clearRect(0, 0, puzzleWidthRef.current, puzzleHeightRef.current);

    piecesRef.current.forEach((piece) => {
      if (piece === currentPieceRef.current) return;

      stage.drawImage(
        imgRef.current,
        piece.sx,
        piece.sy,
        originalPieceWidthRef.current,
        originalPieceHeightRef.current,
        piece.xPos,
        piece.yPos,
        pieceWidthRef.current,
        pieceHeightRef.current
      );
      stage.strokeRect(piece.xPos, piece.yPos, pieceWidthRef.current, pieceHeightRef.current);

      if (
        !currentDropPieceRef.current &&
        mouseRef.current.x >= piece.xPos &&
        mouseRef.current.x <= piece.xPos + pieceWidthRef.current &&
        mouseRef.current.y >= piece.yPos &&
        mouseRef.current.y <= piece.yPos + pieceHeightRef.current
      ) {
        currentDropPieceRef.current = piece;
        stage.save();
        stage.globalAlpha = 0.4;
        stage.fillStyle = PUZZLE_HOVER_TINT;
        stage.fillRect(piece.xPos, piece.yPos, pieceWidthRef.current, pieceHeightRef.current);
        stage.restore();
      }
    });

    stage.save();
    stage.globalAlpha = 0.6;
    stage.drawImage(
      imgRef.current,
      currentPieceRef.current.sx,
      currentPieceRef.current.sy,
      originalPieceWidthRef.current,
      originalPieceHeightRef.current,
      mouseRef.current.x - pieceWidthRef.current / 2,
      mouseRef.current.y - pieceHeightRef.current / 2,
      pieceWidthRef.current,
      pieceHeightRef.current
    );
    stage.restore();
    stage.strokeRect(
      mouseRef.current.x - pieceWidthRef.current / 2,
      mouseRef.current.y - pieceHeightRef.current / 2,
      pieceWidthRef.current,
      pieceHeightRef.current
    );
  };

  const pieceDropped = () => {
    if (currentDropPieceRef.current && currentPieceRef.current) {
      const tmp = {
        xPos: currentPieceRef.current.xPos,
        yPos: currentPieceRef.current.yPos,
      };
      currentPieceRef.current.xPos = currentDropPieceRef.current.xPos;
      currentPieceRef.current.yPos = currentDropPieceRef.current.yPos;
      currentDropPieceRef.current.xPos = tmp.xPos;
      currentDropPieceRef.current.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
    currentPieceRef.current = null;
    currentDropPieceRef.current = null;
  };

  const resetPuzzleAndCheckWin = () => {
    const stage = stageRef.current;
    stage.clearRect(0, 0, puzzleWidthRef.current, puzzleHeightRef.current);
    
    let gameWin = true;

    piecesRef.current.forEach((piece) => {
      stage.drawImage(
        imgRef.current,
        piece.sx,
        piece.sy,
        originalPieceWidthRef.current,
        originalPieceHeightRef.current,
        piece.xPos,
        piece.yPos,
        pieceWidthRef.current,
        pieceHeightRef.current
      );
      stage.strokeRect(piece.xPos, piece.yPos, pieceWidthRef.current, pieceHeightRef.current);

      const xTemp = piece.xPos * (imgRef.current.width / puzzleWidthRef.current);
      const yTemp = piece.yPos * (imgRef.current.height / puzzleHeightRef.current);
      
      if (piece.sx !== xTemp || piece.sy !== yTemp) {
        gameWin = false;
      }
    });

    if (gameWin) {
      setGameWon(true);
      // Mark puzzle as completed for current province
      const userData = getUserData();
      if (userData.unlockedRegions.length > 0) {
        const lastUnlocked = userData.unlockedRegions[userData.unlockedRegions.length - 1];
        markGameCompleted(lastUnlocked, 'puzzle');
        console.log('🧩 Puzzle completed for:', lastUnlocked);
      }
    }
  };

  const changePuzzle = (puzzleUrl) => {
    setCurrentPuzzle(puzzleUrl);
    setShowPuzzleList(false);
    setGameWon(false);
  };

  return (
    <div className="puzzle-game-page">
      <div className="puzzle-header">
        <button className="puzzle-back-btn" onClick={onBack || (() => navigate('/games'))}>
          ← Kembali
        </button>
        <h1 className="puzzle-title">Puzzle Nusantara</h1>
      </div>

      <div className="puzzle-canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="puzzle-canvas noselect"
          onMouseDown={onPuzzleClick}
          onMouseMove={updatePuzzle}
          onMouseUp={pieceDropped}
          onTouchStart={onPuzzleClick}
          onTouchMove={updatePuzzle}
          onTouchEnd={pieceDropped}
        />
      </div>

      <div className="puzzle-nav">
        <button className="puzzle-btn" onClick={() => setShowPuzzleList(true)}>
          Ganti Puzzle
        </button>
        <button className="puzzle-btn" onClick={() => setShowHint(true)}>
          Hint
        </button>
      </div>

      {/* Puzzle List Popup */}
      {showPuzzleList && (
        <div className="puzzle-popup" onClick={() => setShowPuzzleList(false)}>
          <div className="puzzle-popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Pilih Puzzle</h2>
            <div className="puzzle-list">
              {PUZZLE_IMAGES.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Puzzle ${index + 1}`}
                  onClick={() => changePuzzle(img)}
                  className="puzzle-thumbnail"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hint Popup */}
      {showHint && (
        <div className="puzzle-popup" onClick={() => setShowHint(false)}>
          <div className="puzzle-popup-content">
            <img src={currentPuzzle} alt="Hint" className="puzzle-hint-img" />
          </div>
        </div>
      )}

      {/* Win Popup */}
      {gameWon && (
        <div className="puzzle-popup">
          <div className="puzzle-popup-content puzzle-win">
            <h2>🎉 Selamat!</h2>
            <p>Kamu berhasil menyelesaikan puzzle!</p>
            <div className="puzzle-win-actions">
              <button className="puzzle-btn" onClick={() => changePuzzle(currentPuzzle)}>
                Main Lagi
              </button>
              <button className="puzzle-btn" onClick={onBack || (() => navigate('/games'))}>
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
