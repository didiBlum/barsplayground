import React from "react";
import { useNavigate } from "react-router-dom";
import ryderImg from './assets/ryder.png';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e3f0ff 0%, #f6e05e 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Paw prints background */}
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${32 + Math.random() * 32}px`,
            opacity: 0.12 + Math.random() * 0.18,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >🐾</span>
      ))}
      <div style={{ maxWidth: 420, width: '100%', padding: 36, textAlign: 'center', background: 'rgba(255,255,255,0.95)', borderRadius: 36, boxShadow: '0 8px 32px #0002', zIndex: 1, position: 'relative' }}>
        <img src={ryderImg} alt="ריידר" style={{ width: 140, margin: '0 auto 18px', display: 'block', filter: 'drop-shadow(0 4px 12px #1976d2aa)' }} />
        <h1 style={{ fontSize: 32, marginBottom: 28, color: '#1976d2', fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 8px #ffd70044' }}>
          ברוכים הבאים למשחקיה של ריידר והגורים <span style={{ fontSize: 36 }}>🐾</span>
        </h1>
        <button onClick={() => navigate('/rescue')} style={btnStyle}>🚨 משחק ההצלה</button>
        <button onClick={() => navigate('/puzzle?mode=sliding')} style={btnStyle}>🧩 פאזל 1 (הזזה)</button>
        <button onClick={() => navigate('/puzzle?mode=jigsaw')} style={btnStyle}>🧩 פאזל 2 (גרירה)</button>
        <button onClick={() => navigate('/memory')} style={btnStyle}>🃏 משחק זיכרון</button>
        <button onClick={() => navigate('/math')} style={btnStyle}>🔢 משחק חשבון</button>
      </div>
      <style>{`
        button.fun-bounce:hover {
          animation: fun-bounce 0.4s;
        }
        @keyframes fun-bounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.12) rotate(-3deg); }
          60% { transform: scale(0.96) rotate(2deg); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

const btnStyle = {
  display: 'block',
  width: '100%',
  margin: '16px auto',
  padding: '18px',
  fontSize: 24,
  cursor: 'pointer',
  borderRadius: 22,
  background: 'linear-gradient(90deg, #f6e05e 60%, #ffd700 100%)',
  border: 'none',
  fontWeight: 900,
  boxShadow: '0 2px 8px #ffd70044',
  transition: 'transform 0.15s, box-shadow 0.15s',
  outline: 'none',
  color: '#1976d2',
  letterSpacing: 1,
  textShadow: '0 2px 8px #fff8',
  marginBottom: 18,
  animation: 'fun-bounce 0.7s',
}; 