import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome.jsx";
import App from "./App.jsx";
import PuzzleGame from "./puzzle/PuzzleGame.jsx";
import MemoryGame from "./memory/MemoryGame.jsx";
import MathGame from "./math/MathGame.jsx";
import TriviaGame from "./trivia/TriviaGame.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/rescue" element={<App />} />
        <Route path="/puzzle" element={<PuzzleGame />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/math" element={<MathGame />} />
        <Route path="/trivia" element={<TriviaGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
