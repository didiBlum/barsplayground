import React, { useState } from "react";
import marshallImg from '../assets/marshall.jpg';
import rockyImg from '../assets/rocky.jpg';
import zumaImg from '../assets/zuma.jpg';
import chaseImg from '../assets/chase.webp';
import rubbleImg from '../assets/rubble.webp';
import skyeImg from '../assets/skye.jpg';
import ryderImg from '../assets/ryder.png';
import iconImg from '../assets/icon.jpg';
import mightyImg from '../assets/i-mighty-pups-i.jpg';

const allImages = [
  { src: marshallImg, name: 'מרשל' },
  { src: rockyImg, name: 'רוקי' },
  { src: zumaImg, name: 'זומה' },
  { src: chaseImg, name: 'צ׳ייס' },
  { src: rubbleImg, name: 'ראבל' },
  { src: skyeImg, name: 'סקיי' },
  { src: ryderImg, name: 'ריידר' },
  { src: iconImg, name: 'סמל' },
  { src: mightyImg, name: 'כל הגיבורים' },
];

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryGame() {
  const [pairCount, setPairCount] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices
  const [matched, setMatched] = useState([]); // indices
  const [started, setStarted] = useState(false);

  function startGame() {
    const chosen = shuffle(allImages).slice(0, pairCount);
    const deck = shuffle([...chosen, ...chosen].map((img, i) => ({ ...img, id: i + '-' + img.name })));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setStarted(true);
  }

  function handleFlip(idx) {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    setFlipped(f => [...f, idx]);
  }

  React.useEffect(() => {
    if (flipped.length === 2) {
      const [i1, i2] = flipped;
      if (cards[i1].name === cards[i2].name) {
        setTimeout(() => {
          setMatched(m => [...m, i1, i2]);
          setFlipped([]);
        }, 700);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  }, [flipped, cards]);

  const gridCols = pairCount <= 4 ? 4 : pairCount <= 6 ? 4 : 5;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
      <h2>משחק זיכרון</h2>
      <div style={{ marginBottom: 16 }}>
        <label>מספר זוגות: </label>
        <select value={pairCount} onChange={e => setPairCount(Number(e.target.value))}>
          {[4, 6, 8, 10].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button onClick={startGame} style={{ marginLeft: 16, color: '#1976d2', fontWeight: 700 }}>התחל</button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap: 12,
          width: 420,
          margin: 'auto',
          background: '#f7fafc',
          borderRadius: 16,
          boxShadow: '0 2px 12px #0001',
          padding: 16,
        }}
      >
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={card.id}
              onClick={() => started && handleFlip(idx)}
              style={{
                width: 70,
                height: 70,
                background: isFlipped ? `url(${card.src}) center/cover` : '#ffd700',
                borderRadius: 12,
                border: '2px solid #1976d2',
                cursor: started && !isFlipped ? 'pointer' : 'default',
                boxShadow: isFlipped ? '0 2px 12px #1976d288' : '0 2px 8px #ffd70044',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: '#1976d2',
                transition: 'background 0.3s, box-shadow 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {!isFlipped && <span style={{ fontSize: 32 }}>❓</span>}
            </div>
          );
        })}
      </div>
      {matched.length === cards.length && cards.length > 0 && (
        <div style={{ margin: 24, fontSize: 28, color: '#38a169', fontWeight: 900 }}>🎉 כל הכבוד! מצאת את כל הזוגות!</div>
      )}
    </div>
  );
} 