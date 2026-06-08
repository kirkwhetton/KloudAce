import { useState, useMemo, useCallback } from "react";
import "./WordSearch.css";

const DIRS = [
  [0, 1],  // right
  [1, 0],  // down
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function buildGrid(words, size) {
  const grid = Array.from({ length: size }, () => Array(size).fill(""));
  const placed = [];

  for (const { word } of words) {
    let success = false;
    const attempts = 200;
    for (let a = 0; a < attempts && !success; a++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const endRow = row + dr * (word.length - 1);
      const endCol = col + dc * (word.length - 1);
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dr * i, c = col + dc * i;
        if (grid[r][c] !== "" && grid[r][c] !== word[i]) { ok = false; break; }
      }
      if (!ok) continue;
      for (let i = 0; i < word.length; i++) grid[row + dr * i][col + dc * i] = word[i];
      placed.push({ word, row, col, dr, dc });
      success = true;
    }
    if (!success) placed.push({ word, row: -1, col: -1, dr: 0, dc: 0 }); // failed to place
  }

  // Fill gaps with random letters
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (grid[r][c] === "") grid[r][c] = ALPHABET[Math.floor(Math.random() * 26)];

  return { grid, placed };
}

function cellsForWord({ row, col, dr, dc, word }) {
  if (row === -1) return [];
  return Array.from({ length: word.length }, (_, i) => `${row + dr * i},${col + dc * i}`);
}

export default function WordSearch({ card, onKnow, onSrsRate }) {
  const { words, size = 12 } = card;

  const { grid, placed } = useMemo(() => buildGrid(words, size), [card.id]);

  // Map word → its cells for quick lookup
  const wordCellMap = useMemo(() => {
    const m = {};
    for (const p of placed) m[p.word] = cellsForWord(p);
    return m;
  }, [placed]);

  const [firstClick, setFirstClick] = useState(null);   // { r, c }
  const [found, setFound] = useState({});                // word → true
  const [lastFound, setLastFound] = useState(null);      // { word, clue } — for description reveal
  const [wrongFlash, setWrongFlash] = useState(null);    // "r,c" of second click when wrong

  const allFound = found && Object.keys(found).length === words.length;

  // Cells that are highlighted because they belong to a found word
  const foundCells = useMemo(() => {
    const s = new Set();
    for (const [word, ok] of Object.entries(found)) {
      if (ok) for (const k of (wordCellMap[word] ?? [])) s.add(k);
    }
    return s;
  }, [found, wordCellMap]);

  const handleCell = useCallback((r, c) => {
    if (allFound) return;
    const key = `${r},${c}`;

    if (!firstClick) {
      setFirstClick({ r, c });
      return;
    }

    if (firstClick.r === r && firstClick.c === c) {
      setFirstClick(null);
      return;
    }

    // Check if first→second forms a valid word
    const dr = r - firstClick.r;
    const dc = c - firstClick.c;

    // Must be a straight line (same row, col, or diagonal)
    const absDr = Math.abs(dr), absDc = Math.abs(dc);
    const isLine = dr === 0 || dc === 0 || absDr === absDc;

    if (isLine) {
      const len = Math.max(absDr, absDc) + 1;
      const stepR = dr === 0 ? 0 : dr / absDr;
      const stepC = dc === 0 ? 0 : dc / absDc;
      const selected = Array.from({ length: len }, (_, i) =>
        grid[firstClick.r + stepR * i]?.[firstClick.c + stepC * i] ?? ""
      ).join("");

      const match = words.find(
        ({ word }) => !found[word] && word === selected
      );

      if (match) {
        setFound(prev => ({ ...prev, [match.word]: true }));
        setLastFound({ word: match.word, clue: match.clue });
        setFirstClick(null);
        return;
      }
    }

    // Wrong — flash the second cell
    setWrongFlash(key);
    setTimeout(() => setWrongFlash(null), 500);
    setFirstClick(null);
  }, [firstClick, grid, words, found, allFound]);

  const handleNext = () => onSrsRate ? onSrsRate(allFound ? 4 : 2) : onKnow?.();

  return (
    <div className="ws-root">
      {card.title && <p className="ws-game-title">{card.title}</p>}
      <p className="ws-subtitle">{words.length} words hidden in the grid</p>

      {/* Clue reveal banner */}
      {lastFound && (
        <div className="ws-reveal" key={lastFound.word}>
          <span className="ws-reveal-word">{lastFound.word}</span>
          <span className="ws-reveal-clue">{lastFound.clue}</span>
        </div>
      )}

      {/* Grid */}
      <div className="ws-grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const key = `${r},${c}`;
            const isFound = foundCells.has(key);
            const isFirst = firstClick?.r === r && firstClick?.c === c;
            const isWrong = wrongFlash === key;
            return (
              <button
                key={key}
                className={[
                  "ws-cell",
                  isFound  && "ws-cell--found",
                  isFirst  && "ws-cell--selected",
                  isWrong  && "ws-cell--wrong",
                ].filter(Boolean).join(" ")}
                onClick={() => handleCell(r, c)}
              >
                {letter}
              </button>
            );
          })
        )}
      </div>

      {/* Word list */}
      <div className="ws-words">
        {words.map(({ word, clue }) => (
          <span
            key={word}
            className={`ws-word${found[word] ? " ws-word--found" : ""}`}
            title={found[word] ? clue : ""}
          >
            {word}
          </span>
        ))}
      </div>

      {allFound && (
        <div className="ws-complete">
          <span className="ws-complete-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
          <p className="ws-complete-msg">All words found!</p>
          <button className="ws-btn ws-btn--next" onClick={handleNext}>Next →</button>
        </div>
      )}

      {!allFound && (
        <button className="ws-btn ws-btn--skip" onClick={handleNext}>Skip →</button>
      )}
    </div>
  );
}
