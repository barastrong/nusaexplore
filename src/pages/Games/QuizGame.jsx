import { useState } from 'react';
import { quizData } from '../../data/quizData';

export default function QuizGame({ onBack }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = quizData[qIdx];

  const handleAnswer = (i) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(i);
    if (i === currentQuestion.ans) setScore(score + 1);
    
    setTimeout(() => {
      if (qIdx + 1 >= quizData.length) {
        setShowResult(true);
      } else {
        setQIdx(qIdx + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setQIdx(0);
    setScore(0);
    setAnswered(false);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const getResultMessage = () => {
    if (score <= 2) return 'Jangan menyerah! Coba lagi untuk belajar lebih banyak tentang Indonesia.';
    if (score <= 5) return 'Lumayan! Masih banyak keajaiban budaya Indonesia yang bisa kamu pelajari.';
    if (score <= 7) return 'Bagus! Kamu cukup mengenal budaya Indonesia. Terus eksplorasi!';
    if (score <= 9) return 'Luar biasa! Pengetahuan budayamu sangat baik. Indonesia bangga padamu!';
    return 'Sempurna! Kamu adalah penjaga sejati budaya Nusantara!';
  };

  const getEmoji = () => {
    const emojis = ['😢', '😅', '🙂', '😊', '🌟', '🏆'];
    return emojis[Math.min(Math.floor(score / 2), 5)];
  };

  return (
    <div className="quiz-game show">
      <div className="quiz-header">
        <button className="quiz-back" onClick={onBack}>← Kembali</button>
        <div className="quiz-title">Quiz Budaya Indonesia</div>
      </div>
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{width: `${((qIdx + 1) / quizData.length * 100)}%`}}></div>
      </div>

      {!showResult ? (
        <div className="quiz-card">
          <div className="quiz-num">Soal {qIdx + 1} dari {quizData.length}</div>
          <div className="quiz-question">{currentQuestion.q}</div>
          <div className="quiz-options">
            {currentQuestion.opts.map((opt, i) => (
              <button
                key={i}
                className={`quiz-opt ${answered && i === currentQuestion.ans ? 'correct' : ''} ${answered && i === selectedAnswer && i !== currentQuestion.ans ? 'wrong' : ''}`}
                onClick={() => handleAnswer(i)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-result show">
          <div className="result-emoji">{getEmoji()}</div>
          <div className="result-score">{score}</div>
          <div className="result-label">dari {quizData.length} soal benar</div>
          <div className="result-msg">{getResultMessage()}</div>
          <button className="result-btn" onClick={resetQuiz}>Main Lagi</button>
        </div>
      )}
    </div>
  );
}
