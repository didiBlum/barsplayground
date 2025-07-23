import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import marshallImg from '../assets/marshall.jpg';
import rockyImg from '../assets/rocky.jpg';
import zumaImg from '../assets/zuma.jpg';
import chaseImg from '../assets/chase.webp';
import rubbleImg from '../assets/rubble.webp';
import skyeImg from '../assets/skye.jpg';
import ryderImg from '../assets/ryder.png';
import iconImg from '../assets/icon.jpg';
import mightyImg from '../assets/i-mighty-pups-i.jpg';

const images = [
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

export default function PuzzleGame() {
  const location = useLocation();
  const queryMode = new URLSearchParams(location.search).get('mode');
  const [mode, setMode] = useState(queryMode === 'jigsaw' ? 'jigsaw' : 'sliding');
  const [selectedImg, setSelectedImg] = useState(images[0].src);
  const [pieceCount, setPieceCount] = useState(9);
  const [tiles, setTiles] = useState([]);
  const [size, setSize] = useState(3); // sqrt(pieceCount)
  const [started, setStarted] = useState(false);
  // For jigsaw mode
  const [jigsawBoard, setJigsawBoard] = useState([]); // board: array of piece indices or null
  const [jigsawPieces, setJigsawPieces] = useState([]); // pieces to drag
  const dragPiece = useRef(null);
  const [selectedPieceIdx, setSelectedPieceIdx] = useState(null); // for mobile tap-to-place

  React.useEffect(() => {
    const n = Math.round(Math.sqrt(pieceCount));
    setSize(n);
    const arr = Array.from({ length: n * n }, (_, i) => i);
    setTiles(shuffle(arr));
    setJigsawBoard(Array(n * n).fill(null));
    setJigsawPieces(shuffle(arr));
    setStarted(false);
  }, [pieceCount, selectedImg, mode]);

  function startGame() {
    setStarted(true);
    const n = Math.round(Math.sqrt(pieceCount));
    setSize(n);
    const arr = Array.from({ length: n * n }, (_, i) => i);
    setTiles(shuffle(arr));
    setJigsawBoard(Array(n * n).fill(null));
    setJigsawPieces(shuffle(arr));
  }

  function moveTile(idx) {
    if (!started) return;
    const emptyIdx = tiles.indexOf(tiles.length - 1);
    const row = Math.floor(idx / size), col = idx % size;
    const emptyRow = Math.floor(emptyIdx / size), emptyCol = emptyIdx % size;
    if ((Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1) {
      const newTiles = tiles.slice();
      [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
      setTiles(newTiles);
    }
  }

  function isSolved() {
    if (mode === 'sliding') {
      return tiles.every((v, i) => v === i);
    } else {
      return jigsawBoard.every((v, i) => v === i);
    }
  }

  // Drag & Drop handlers for jigsaw mode
  function onDragStart(pieceIdx) {
    dragPiece.current = pieceIdx;
  }
  function onDropBoard(idx) {
    if (jigsawBoard[idx] !== null) return;
    const pieceIdx = dragPiece.current ?? selectedPieceIdx;
    if (pieceIdx == null) return;
    // Remove from pieces, place on board
    setJigsawPieces(pieces => pieces.filter(p => p !== pieceIdx));
    setJigsawBoard(board => {
      const newBoard = board.slice();
      newBoard[idx] = pieceIdx;
      return newBoard;
    });
    dragPiece.current = null;
    setSelectedPieceIdx(null);
  }
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDragPieceBack(idx) {
    // Remove from board, add back to pieces
    const pieceIdx = jigsawBoard[idx];
    if (pieceIdx == null) return;
    setJigsawBoard(board => {
      const newBoard = board.slice();
      newBoard[idx] = null;
      return newBoard;
    });
    setJigsawPieces(pieces => [...pieces, pieceIdx]);
  }
  // Mobile tap-to-select/tap-to-place
  function handlePieceTap(pieceIdx) {
    setSelectedPieceIdx(pieceIdx === selectedPieceIdx ? null : pieceIdx);
  }
  function handleBoardTap(idx) {
    if (jigsawBoard[idx] !== null || selectedPieceIdx == null) return;
    onDropBoard(idx);
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', textAlign: 'center' }}>
      <h2>פאזל תמונה</h2>
      <div style={{ marginBottom: 16 }}>
        <label>מצב: </label>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="sliding">פאזל הזזה</option>
          <option value="jigsaw">פאזל גרירה</option>
        </select>
        <label style={{ marginLeft: 16 }}>בחר תמונה: </label>
        <select value={selectedImg} onChange={e => setSelectedImg(e.target.value)}>
          {images.map(img => (
            <option key={img.name} value={img.src}>{img.name}</option>
          ))}
        </select>
        <label style={{ marginLeft: 16 }}>מספר חלקים: </label>
        <input
          type="number"
          min={4}
          max={100}
          step={1}
          value={pieceCount}
          onChange={e => setPieceCount(Math.max(4, Math.min(100, Number(e.target.value))))}
          style={{ width: 60, marginLeft: 4 }}
        />
        <button onClick={startGame} style={{ marginLeft: 16 }}>התחל</button>
      </div>
      {mode === 'sliding' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
            gap: 2,
            width: 360,
            height: 360,
            margin: 'auto',
            background: '#eee',
            borderRadius: 16,
            boxShadow: '0 2px 12px #0001',
          }}
        >
          {tiles.map((tile, idx) => {
            if (tile === tiles.length - 1 && !isSolved()) {
              // empty tile
              return <div key={idx} style={{ background: '#fff', borderRadius: 8 }} />;
            }
            const n = size;
            const x = tile % n, y = Math.floor(tile / n);
            return (
              <div
                key={idx}
                onClick={() => moveTile(idx)}
                style={{
                  backgroundImage: `url(${selectedImg})`,
                  backgroundSize: `${n * 100}% ${n * 100}%`,
                  backgroundPosition: `${(x * 100) / (n - 1)}% ${(y * 100) / (n - 1)}%`,
                  borderRadius: 8,
                  cursor: started ? 'pointer' : 'default',
                  border: '1px solid #ccc',
                  transition: 'box-shadow 0.2s',
                  boxShadow: started ? '0 2px 8px #1976d244' : 'none',
                  minHeight: 0,
                }}
              />
            );
          })}
        </div>
      )}
      {mode === 'jigsaw' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 24 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gridTemplateRows: `repeat(${size}, 1fr)`,
              gap: 2,
              width: 360,
              height: 360,
              background: '#eee',
              borderRadius: 16,
              boxShadow: '0 2px 12px #0001',
            }}
          >
            {jigsawBoard.map((pieceIdx, idx) => {
              const n = size;
              const x = idx % n, y = Math.floor(idx / n);
              return pieceIdx == null ? (
                <div
                  key={idx}
                  onDragOver={onDragOver}
                  onDrop={() => onDropBoard(idx)}
                  onClick={() => handleBoardTap(idx)}
                  style={{ background: '#fff', borderRadius: 8, minHeight: 0, border: selectedPieceIdx != null ? '2px dashed #1976d2' : 'none' }}
                />
              ) : (
                <div
                  key={idx}
                  draggable
                  onDragStart={() => onDragPieceBack(idx)}
                  style={{
                    backgroundImage: `url(${selectedImg})`,
                    backgroundSize: `${n * 100}% ${n * 100}%`,
                    backgroundPosition: `${(pieceIdx % n * 100) / (n - 1)}% ${(Math.floor(pieceIdx / n) * 100) / (n - 1)}%`,
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    minHeight: 0,
                    cursor: 'grab',
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${jigsawPieces.length > 24 ? 4 : jigsawPieces.length > 12 ? 3 : 2}, 1fr)`,
              gap: 8,
              alignContent: 'flex-start',
              maxHeight: 360,
              minWidth: 160,
              background: '#f9f9f9',
              borderRadius: 12,
              padding: 8,
              boxShadow: '0 2px 8px #0001',
              overflowY: 'auto',
            }}
          >
            {jigsawPieces.map(pieceIdx => {
              const n = size;
              const x = pieceIdx % n, y = Math.floor(pieceIdx / n);
              const isSelected = selectedPieceIdx === pieceIdx;
              return (
                <div
                  key={pieceIdx}
                  draggable
                  onDragStart={() => onDragStart(pieceIdx)}
                  onClick={() => handlePieceTap(pieceIdx)}
                  style={{
                    width: 70,
                    height: 70,
                    backgroundImage: `url(${selectedImg})`,
                    backgroundSize: `${n * 100}% ${n * 100}%`,
                    backgroundPosition: `${(x * 100) / (n - 1)}% ${(y * 100) / (n - 1)}%`,
                    borderRadius: 8,
                    border: isSelected ? '3px solid #1976d2' : '1px solid #ccc',
                    cursor: 'grab',
                    boxShadow: isSelected ? '0 0 0 4px #90caf9' : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {isSolved() && started && <div style={{ margin: 24, fontSize: 24, color: '#38a169' }}>🎉 הצלחת!</div>}
    </div>
  );
} 