import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import "./Crossword.css";

export default function Crossword({ card, onKnow, onSrsRate }) {
  const { grid, across, down, rows, cols, title } = card;

  // ── Derived lookup maps ───────────────────────────────────────
  const cellNums = useMemo(() => {
    const m = {};
    [...across, ...down].forEach(w => { m[`${w.row},${w.col}`] = w.number; });
    return m;
  }, [across, down]);

  const cellAcross = useMemo(() => {
    const m = {};
    across.forEach(w => {
      for (let i = 0; i < w.answer.length; i++) m[`${w.row},${w.col + i}`] = w.number;
    });
    return m;
  }, [across]);

  const cellDown = useMemo(() => {
    const m = {};
    down.forEach(w => {
      for (let i = 0; i < w.answer.length; i++) m[`${w.row + i},${w.col}`] = w.number;
    });
    return m;
  }, [down]);

  // ── State ────────────────────────────────────────────────────
  const [userGrid, setUserGrid] = useState(() =>
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState("across");
  const [showCheck, setShowCheck] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef(null);

  // ── Cells in the currently highlighted word ───────────────────
  const wordCells = useMemo(() => {
    if (!selected) return new Set();
    const key = `${selected.row},${selected.col}`;
    const num = direction === "across" ? cellAcross[key] : cellDown[key];
    const wordDef = direction === "across"
      ? across.find(w => w.number === num)
      : down.find(w => w.number === num);
    if (!wordDef) return new Set();
    const cells = new Set();
    for (let i = 0; i < wordDef.answer.length; i++) {
      cells.add(direction === "across"
        ? `${wordDef.row},${wordDef.col + i}`
        : `${wordDef.row + i},${wordDef.col}`);
    }
    return cells;
  }, [selected, direction, cellAcross, cellDown, across, down]);

  // ── Active clue for the banner ────────────────────────────────
  const activeClue = useMemo(() => {
    if (!selected) return null;
    const key = `${selected.row},${selected.col}`;
    const num = direction === "across" ? cellAcross[key] : cellDown[key];
    return direction === "across"
      ? across.find(w => w.number === num) ?? null
      : down.find(w => w.number === num) ?? null;
  }, [selected, direction, cellAcross, cellDown, across, down]);

  // ── Move to next/prev cell in current direction ───────────────
  const getAdjacentCell = useCallback((row, col, forward) => {
    const dr = direction === "down" ? (forward ? 1 : -1) : 0;
    const dc = direction === "across" ? (forward ? 1 : -1) : 0;
    let r = row + dr, c = col + dc;
    while (r >= 0 && r < rows && c >= 0 && c < cols) {
      if (grid[r][c] !== null) return { row: r, col: c };
      r += dr; c += dc;
    }
    return null;
  }, [direction, grid, rows, cols]);

  // ── Keyboard input ────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (!selected) return;
    const { row, col } = selected;

    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      if (revealed) return;
      setUserGrid(prev => {
        const next = prev.map(r => [...r]);
        next[row][col] = e.key.toUpperCase();
        return next;
      });
      setShowCheck(false);
      const next = getAdjacentCell(row, col, true);
      if (next) setSelected(next);

    } else if (e.key === "Backspace") {
      e.preventDefault();
      if (revealed) return;
      if (userGrid[row][col] !== "") {
        setUserGrid(prev => {
          const next = prev.map(r => [...r]);
          next[row][col] = "";
          return next;
        });
      } else {
        const prev = getAdjacentCell(row, col, false);
        if (prev) {
          setSelected(prev);
          setUserGrid(pg => {
            const next = pg.map(r => [...r]);
            next[prev.row][prev.col] = "";
            return next;
          });
        }
      }
      setShowCheck(false);

    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      direction === "across" ? setSelected(s => getAdjacentCell(s.row, s.col, true) ?? s) : setDirection("across");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      direction === "across" ? setSelected(s => getAdjacentCell(s.row, s.col, false) ?? s) : setDirection("across");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      direction === "down" ? setSelected(s => getAdjacentCell(s.row, s.col, true) ?? s) : setDirection("down");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      direction === "down" ? setSelected(s => getAdjacentCell(s.row, s.col, false) ?? s) : setDirection("down");
    }
  }, [selected, direction, userGrid, revealed, getAdjacentCell]);

  // ── Cell click ────────────────────────────────────────────────
  const handleCellClick = useCallback((row, col) => {
    if (grid[row][col] === null) return;
    if (selected?.row === row && selected?.col === col) {
      const key = `${row},${col}`;
      if (cellAcross[key] && cellDown[key]) setDirection(d => d === "across" ? "down" : "across");
    } else {
      setSelected({ row, col });
      const key = `${row},${col}`;
      const hasAcross = !!cellAcross[key];
      const hasDown = !!cellDown[key];
      if (hasAcross && !hasDown) setDirection("across");
      else if (hasDown && !hasAcross) setDirection("down");
    }
    containerRef.current?.focus();
  }, [selected, grid, cellAcross, cellDown]);

  // ── Auto-detect completion ────────────────────────────────────
  useEffect(() => {
    if (completed) return;
    if (revealed) { setCompleted(true); return; }
    const allCorrect = grid.every((rowArr, r) =>
      rowArr.every((cell, c) => cell === null || userGrid[r][c] === cell)
    );
    const anyFilled = grid.some((rowArr, r) =>
      rowArr.some((cell, c) => cell !== null && userGrid[r][c] !== "")
    );
    if (anyFilled && allCorrect) setCompleted(true);
  }, [userGrid, grid, revealed, completed]);

  // ── Actions ───────────────────────────────────────────────────
  const handleReveal = () => {
    setUserGrid(grid.map(row => row.map(cell => cell ?? "")));
    setRevealed(true);
    setShowCheck(false);
  };

  const handleClear = () => {
    setUserGrid(Array.from({ length: rows }, () => Array(cols).fill("")));
    setShowCheck(false);
    setCompleted(false);
  };

  const handleNext = () => {
    onSrsRate ? onSrsRate(revealed ? 1 : 4) : onKnow?.();
  };

  const getCellStatus = (r, c) => {
    if (!showCheck || grid[r][c] === null || userGrid[r][c] === "") return "neutral";
    return userGrid[r][c] === grid[r][c] ? "correct" : "wrong";
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div
      className="cw-root"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {title && <p className="cw-title">{title}</p>}

      {/* Active clue banner */}
      <div className="cw-active-clue">
        {activeClue ? (
          <>
            <span className="cw-active-clue-num">
              {activeClue.number}{direction === "across" ? "A" : "D"}
            </span>
            <span className="cw-active-clue-text">{activeClue.clue}</span>
          </>
        ) : (
          <span className="cw-active-clue-placeholder">Click a cell to begin</span>
        )}
      </div>

      {/* Grid */}
      <div
        className="cw-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          aspectRatio: `${cols} / ${rows}`,
        }}
      >
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const isBlack = grid[r][c] === null;
            const key = `${r},${c}`;
            const isSelected = selected?.row === r && selected?.col === c;
            const inWord = wordCells.has(key);
            const num = cellNums[key];
            const letter = revealed ? (grid[r][c] || "") : (userGrid[r][c] || "");
            const status = getCellStatus(r, c);

            return (
              <div
                key={key}
                className={[
                  "cw-cell",
                  isBlack ? "cw-cell--black" : "cw-cell--white",
                  !isBlack && isSelected && "cw-cell--selected",
                  !isBlack && inWord && !isSelected && "cw-cell--word",
                  status === "correct" && "cw-cell--correct",
                  status === "wrong" && "cw-cell--wrong",
                  revealed && !isBlack && "cw-cell--revealed",
                ].filter(Boolean).join(" ")}
                onClick={() => handleCellClick(r, c)}
              >
                {!isBlack && num && <span className="cw-cell-num">{num}</span>}
                {!isBlack && <span className="cw-cell-letter">{letter}</span>}
              </div>
            );
          })
        )}
      </div>

      {/* Controls */}
      {!completed && (
        <div className="cw-controls">
          <button className="cw-btn cw-btn--secondary" onClick={() => setShowCheck(s => !s)}>
            {showCheck ? "Hide" : "Check"}
          </button>
          <button className="cw-btn cw-btn--secondary" onClick={handleClear}>
            Clear
          </button>
          <button className="cw-btn cw-btn--reveal" onClick={handleReveal}>
            Reveal
          </button>
          <button className="cw-btn cw-btn--skip" onClick={handleNext}>
            Next →
          </button>
        </div>
      )}

      {/* Completed */}
      {completed && (
        <div className="cw-complete">
          <span className="cw-complete-icon">
            {revealed ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </span>
          <p className="cw-complete-msg">{revealed ? "Puzzle revealed" : "Solved!"}</p>
          <button className="cw-btn cw-btn--next" onClick={handleNext}>
            Next →
          </button>
        </div>
      )}

      {/* Clue lists */}
      <div className="cw-clues">
        <div className="cw-clues-col">
          <h3 className="cw-clues-heading">Across</h3>
          {across.map(clue => (
            <button
              key={`a-${clue.number}`}
              className={`cw-clue-item${activeClue?.number === clue.number && direction === "across" ? " cw-clue-item--active" : ""}`}
              onClick={() => { setSelected({ row: clue.row, col: clue.col }); setDirection("across"); containerRef.current?.focus(); }}
            >
              <span className="cw-clue-num">{clue.number}A</span>
              <span className="cw-clue-text">{clue.clue}</span>
            </button>
          ))}
        </div>
        <div className="cw-clues-col">
          <h3 className="cw-clues-heading">Down</h3>
          {down.map(clue => (
            <button
              key={`d-${clue.number}`}
              className={`cw-clue-item${activeClue?.number === clue.number && direction === "down" ? " cw-clue-item--active" : ""}`}
              onClick={() => { setSelected({ row: clue.row, col: clue.col }); setDirection("down"); containerRef.current?.focus(); }}
            >
              <span className="cw-clue-num">{clue.number}D</span>
              <span className="cw-clue-text">{clue.clue}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
