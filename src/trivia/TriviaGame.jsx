import React, { useState } from "react";
import ryderImg from '../assets/ryder.png';

const questions = [
  { 
    q: 'מי אומר: "אל תשליך את זה, תמחזר את זה"?', 
    options: ['רוקי', 'מרשל', 'צ׳ייס', 'ראבל'], 
    correct: 0 
  },
  { 
    q: 'איזה חיה מחמד יש לראשת העיר?', 
    options: ['כלב', 'תרנגולת', 'חתול', 'ברווז'], 
    correct: 1 
  },
  { 
    q: 'מה הצבע של מרשל?', 
    options: ['כחול', 'אדום', 'צהוב', 'ירוק'], 
    correct: 1 
  },
  { 
    q: 'מה התפקיד של צ׳ייס?', 
    options: ['כבאי', 'שוטר', 'מתקן', 'טייס'], 
    correct: 1 
  },
  { 
    q: 'איך קוראים לרכב של ריידר?', 
    options: ['מטוס', 'אופנוע', 'מכונית', 'אופניים'], 
    correct: 1 
  },
  { 
    q: 'מה התפקיד של סקיי?', 
    options: ['כבאי', 'שוטר', 'טייס', 'מתקן'], 
    correct: 2 
  },
  { 
    q: 'מה הצבע של זומה?', 
    options: ['כחול', 'כתום', 'אדום', 'ירוק'], 
    correct: 1 
  },
  { 
    q: 'מה התפקיד של ראבל?', 
    options: ['חפירה ובנייה', 'כבאי', 'שוטר', 'הצלה ימית'], 
    correct: 0 
  },
  { 
    q: 'איך קוראים לרכב של מרשל?', 
    options: ['מכונית כבאות', 'מטוס', 'סירה', 'מכונית משטרה'], 
    correct: 0 
  },
  { 
    q: 'מה הצבע של רוקי?', 
    options: ['אדום', 'ירוק', 'כחול', 'צהוב'], 
    correct: 1 
  },
  { 
    q: 'איך קוראים לרכב של סקיי?', 
    options: ['מטוס', 'מסוק', 'רחפן', 'בלון'], 
    correct: 0 
  },
  { 
    q: 'מה התפקיד של זומה?', 
    options: ['כבאי', 'הצלה ימית', 'שוטר', 'מתקן'], 
    correct: 1 
  },
  { 
    q: 'איך קוראים לרכב של צ׳ייס?', 
    options: ['מכונית כבאות', 'מכונית משטרה', 'מטוס', 'סירה'], 
    correct: 1 
  },
  { 
    q: 'מה הצבע של ראבל?', 
    options: ['אדום', 'צהוב', 'כחול', 'ירוק'], 
    correct: 1 
  },
  { 
    q: 'איך קוראים לרכב של זומה?', 
    options: ['מטוס', 'סירה', 'מכונית', 'אופנוע'], 
    correct: 1 
  },
  { 
    q: 'מה הצבע של צ׳ייס?', 
    options: ['אדום', 'כחול', 'ירוק', 'כתום'], 
    correct: 1 
  },
  { 
    q: 'איך קוראים לרכב של ראבל?', 
    options: ['בולדוזר', 'מכונית', 'מטוס', 'סירה'], 
    correct: 0 
  },
  { 
    q: 'מה הצבע של סקיי?', 
    options: ['ורוד', 'כחול', 'אדום', 'ירוק'], 
    correct: 0 
  },
  { 
    q: 'איך קוראים למקום שבו הגורים גרים?', 
    options: ['מגדל', 'בית', 'מאורה', 'מגדל הפטרול'], 
    correct: 3 
  },
  { 
    q: 'מה התפקיד של מרשל?', 
    options: ['שוטר', 'כבאי', 'מתקן', 'טייס'], 
    correct: 1 
  },
];

export default function TriviaGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(optionIndex) {
    if (selectedAnswer !== null) return; // Already answered
    setSelectedAnswer(optionIndex);
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  }

  function resetGame() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <div style={{ maxWidth: 420, margin: '40px auto', textAlign: 'center', background: 'white', borderRadius: 32, boxShadow: '0 8px 32px #0002', padding: 32 }}>
        <img src={ryderImg} alt="ריידר" style={{ width: 120, margin: '0 auto 12px', display: 'block', filter: 'drop-shadow(0 4px 12px #1976d2aa)' }} />
        <h2 style={{ color: '#1976d2', fontWeight: 900, fontSize: 28 }}>כל הכבוד!</h2>
        <div style={{ fontSize: 22, margin: 16 }}>ענית נכון על {score} מתוך {questions.length} שאלות!</div>
        <div style={{ fontSize: 40, margin: 16 }}>🎉🦴🐾</div>
        <button onClick={resetGame} style={{ fontSize: 22, padding: '10px 24px', borderRadius: 16, background: '#f6e05e', color: '#1976d2', fontWeight: 700, border: 'none', marginTop: 8 }}>שחק שוב</button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', textAlign: 'center', background: 'white', borderRadius: 32, boxShadow: '0 8px 32px #0002', padding: 32 }}>
      <img src={ryderImg} alt="ריידר" style={{ width: 120, margin: '0 auto 12px', display: 'block', filter: 'drop-shadow(0 4px 12px #1976d2aa)' }} />
      <h2 style={{ color: '#1976d2', fontWeight: 900, fontSize: 28 }}>משחק טריוויה</h2>
      <div style={{ fontSize: 18, margin: 8, color: '#888' }}>שאלה {currentQuestion + 1} מתוך {questions.length}</div>
      <div style={{ fontSize: 22, margin: 24, minHeight: 60 }}>{question.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correct;
          let bgColor = '#f6e05e';
          if (selectedAnswer !== null) {
            if (isCorrect) bgColor = '#38a169';
            else if (isSelected) bgColor = '#d32f2f';
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
              style={{
                fontSize: 20,
                padding: '14px 20px',
                borderRadius: 16,
                background: bgColor,
                color: selectedAnswer !== null && (isCorrect || isSelected) ? 'white' : '#1976d2',
                fontWeight: 700,
                border: 'none',
                cursor: selectedAnswer === null ? 'pointer' : 'default',
                transition: 'all 0.3s',
              }}
            >
              {option} {selectedAnswer !== null && isCorrect && '✓'} {selectedAnswer !== null && isSelected && !isCorrect && '✗'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

