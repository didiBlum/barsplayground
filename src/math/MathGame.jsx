import React, { useState } from "react";
import ryderImg from '../assets/ryder.png';
import marshallImg from '../assets/marshall.jpg';
import rockyImg from '../assets/rocky.jpg';
import zumaImg from '../assets/zuma.jpg';
import chaseImg from '../assets/chase.webp';
import rubbleImg from '../assets/rubble.webp';
import skyeImg from '../assets/skye.jpg';

const pups = [
  { name: 'מרשל', img: marshallImg },
  { name: 'רוקי', img: rockyImg },
  { name: 'זומה', img: zumaImg },
  { name: 'צ׳ייס', img: chaseImg },
  { name: 'ראבל', img: rubbleImg },
  { name: 'סקיי', img: skyeImg },
];

const questions = [
  { q: 'ריידר והגורים יצאו להציל 8 חתולים שנתקעו על עצים. הם כבר הצילו 3. כמה נשארו?', a: 5 },
  { q: 'סקיי טסה מעל העיר וראתה 5 עפיפונים באוויר. 2 עפיפונים נפלו. כמה עפיפונים נשארו באוויר?', a: 3 },
  { q: 'מרשל מילא 4 דליים מים. כל דלי מכיל 3 ליטר. כמה ליטר מים יש לו בסך הכל?', a: 12 },
  { q: 'צ׳ייס חילק 12 מדבקות שוות בין 4 חברים. כמה מדבקות קיבל כל אחד?', a: 3 },
  { q: 'ראבל בנה מגדל מ-10 קוביות. 3 קוביות נפלו. כמה קוביות נשארו במגדל?', a: 7 },
  { q: 'רוקי אסף 7 בקבוקים למחזור. אחר כך מצא עוד 5. כמה בקבוקים יש לו עכשיו?', a: 12 },
  { q: 'זומה שט בנהר וראה 9 ברווזים. 4 מהם שחו משם. כמה ברווזים נשארו?', a: 5 },
  { q: 'סקיי חילקה 15 בלונים ל-5 ילדים. כמה בלונים קיבל כל ילד?', a: 3 },
  { q: 'מרשל רץ 6 פעמים מסביב לפארק. כל סיבוב לוקח 2 דקות. כמה דקות רץ בסך הכל?', a: 12 },
  { q: 'צ׳ייס מצא 20 מטבעות. הוא נתן 8 מהם לחברים. כמה נשארו אצלו?', a: 12 },
  { q: 'ראבל בנה 3 גשרים. כל גשר דורש 4 קורות עץ. כמה קורות עץ השתמש בסך הכל?', a: 12 },
  { q: 'ריידר חילק 18 מדבקות ל-6 גורים. כמה קיבל כל גור?', a: 3 },
  { q: 'רוקי מצא 5 צעצועים. אחר כך מצא פי 2 צעצועים. כמה יש לו עכשיו?', a: 10 },
  { q: 'סקיי עפה 8 קילומטרים ביום ראשון ו-7 ביום שני. כמה קילומטרים עפה בסך הכל?', a: 15 },
  { q: 'זומה חילק 12 דגים ל-3 חתולים. כמה דגים קיבל כל חתול?', a: 4 },
  { q: 'מרשל חילק 10 עוגיות ל-2 חברים. כמה קיבל כל אחד?', a: 5 },
  { q: 'צ׳ייס רדף אחרי 9 פושעים. 3 מהם נתפסו. כמה נשארו?', a: 6 },
  { q: 'ראבל בנה 2 מגדלים. כל מגדל בגובה 5 קוביות. מה הגובה הכולל?', a: 10 },
  { q: 'רוקי אסף 4 פחיות בכל יום במשך 3 ימים. כמה פחיות אסף?', a: 12 },
  { q: 'ריידר חילק 16 בלונים ל-4 ילדים. כמה קיבל כל ילד?', a: 4 },
];

export default function MathGame() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);

  function checkAnswer(e) {
    e.preventDefault();
    if (parseInt(input) === questions[step].a) {
      setCorrect(true);
      setScore(s => s + 1);
      setTimeout(() => {
        setStep(s => s + 1);
        setInput("");
        setCorrect(null);
      }, 900);
    } else {
      setCorrect(false);
      setTimeout(() => setCorrect(null), 900);
    }
  }

  if (step >= questions.length) {
    return (
      <div style={{ maxWidth: 420, margin: '40px auto', textAlign: 'center', background: 'white', borderRadius: 32, boxShadow: '0 8px 32px #0002', padding: 32 }}>
        <img src={ryderImg} alt="ריידר" style={{ width: 120, margin: '0 auto 12px', display: 'block', filter: 'drop-shadow(0 4px 12px #1976d2aa)' }} />
        <h2 style={{ color: '#1976d2', fontWeight: 900, fontSize: 28 }}>כל הכבוד!</h2>
        <div style={{ fontSize: 22, margin: 16 }}>ענית נכון על {score} מתוך {questions.length} שאלות!</div>
        <div style={{ fontSize: 40, margin: 16 }}>🎉🦴🐾</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', textAlign: 'center', background: 'white', borderRadius: 32, boxShadow: '0 8px 32px #0002', padding: 32 }}>
      <img src={ryderImg} alt="ריידר" style={{ width: 120, margin: '0 auto 12px', display: 'block', filter: 'drop-shadow(0 4px 12px #1976d2aa)' }} />
      <h2 style={{ color: '#1976d2', fontWeight: 900, fontSize: 28 }}>משחק חשבון</h2>
      <div style={{ fontSize: 22, margin: 16 }}>{questions[step].q}</div>
      <form onSubmit={checkAnswer}>
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ fontSize: 22, padding: 10, borderRadius: 12, border: '2px solid #1976d2', width: 100, textAlign: 'center', marginBottom: 12 }}
          autoFocus
        />
        <br />
        <button type="submit" style={{ fontSize: 22, padding: '10px 24px', borderRadius: 16, background: '#f6e05e', color: '#1976d2', fontWeight: 700, border: 'none', marginTop: 8 }}>בדוק</button>
      </form>
      {correct === true && <div style={{ color: '#38a169', fontSize: 22, margin: 10 }}>נכון! 🦴</div>}
      {correct === false && <div style={{ color: '#d32f2f', fontSize: 22, margin: 10 }}>נסה שוב!</div>}
      <div style={{ marginTop: 18, fontSize: 18, color: '#888' }}>שאלה {step + 1} מתוך {questions.length}</div>
    </div>
  );
} 