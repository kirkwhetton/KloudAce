import { useState, useEffect, useCallback } from "react";
import "./Wordle.css";

const MAX_GUESSES = 6;
const MAX_HINTS   = 3;

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

function scoreGuess(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const answerArr = answer.split("");
  const guessArr  = guess.split("");

  // First pass — correct positions (green)
  guessArr.forEach((ch, i) => {
    if (ch === answerArr[i]) {
      result[i] = "correct";
      answerArr[i] = null;
      guessArr[i]  = null;
    }
  });

  // Second pass — present but wrong position (yellow)
  guessArr.forEach((ch, i) => {
    if (ch === null) return;
    const j = answerArr.indexOf(ch);
    if (j !== -1) {
      result[i] = "present";
      answerArr[j] = null;
    }
  });

  return result;
}

const PRIORITY = { correct: 3, present: 2, absent: 1 };

export default function Wordle({ card, onKnow, onSrsRate }) {
  const answer  = card.answer.toUpperCase();
  const wordLen = answer.length;

  const [guesses,          setGuesses]          = useState([]);
  const [current,          setCurrent]          = useState("");
  const [shake,            setShake]            = useState(false);
  const [gameState,        setGameState]        = useState("playing");
  const [bounce,           setBounce]           = useState(false);
  const [hintedPositions,  setHintedPositions]  = useState(() => new Set());

  // Best colour per key seen so far
  const usedLetters = {};
  guesses.forEach(g => {
    const scores = scoreGuess(g, answer);
    g.split("").forEach((ch, i) => {
      const prev = usedLetters[ch];
      if (!prev || PRIORITY[scores[i]] > PRIORITY[prev]) usedLetters[ch] = scores[i];
    });
  });

  const submitGuess = useCallback(() => {
    if (current.length !== wordLen) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const next = [...guesses, current];
    setGuesses(next);
    setCurrent("");
    if (current === answer) {
      setGameState("won");
      setTimeout(() => setBounce(true), wordLen * 80 + 300);
    } else if (next.length >= MAX_GUESSES) {
      setGameState("lost");
    }
  }, [current, guesses, answer, wordLen]);

  const handleKey = useCallback((key) => {
    if (gameState !== "playing") return;
    if (key === "ENTER") { submitGuess(); return; }
    if (key === "⌫" || key === "BACKSPACE") { setCurrent(p => p.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && current.length < wordLen) setCurrent(p => p + key);
  }, [gameState, submitGuess, current, wordLen]);

  // Physical keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toUpperCase();
      if (k === "ENTER" || k === "BACKSPACE" || /^[A-Z]$/.test(k)) {
        e.preventDefault();
        handleKey(k);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  // Positions the user has already placed correctly in any guess
  const correctlySolved = new Set(
    guesses.flatMap((g, _) =>
      g.split("").map((ch, i) => ch === answer[i] ? i : -1).filter(i => i !== -1)
    )
  );

  const useHint = useCallback(() => {
    if (hintedPositions.size >= MAX_HINTS || gameState !== "playing") return;
    for (let i = 0; i < wordLen; i++) {
      if (!hintedPositions.has(i) && !correctlySolved.has(i)) {
        setHintedPositions(prev => new Set(prev).add(i));
        return;
      }
    }
  }, [hintedPositions, gameState, wordLen, correctlySolved]);

  // Reduce SRS score when hints were used
  const handleNext = () => {
    const score = gameState === "won"
      ? hintedPositions.size === 0 ? 4 : 3
      : 1;
    onSrsRate ? onSrsRate(score) : onKnow?.();
  };

  // Only render rows that are actually in use
  const rowCount = gameState === "playing" ? guesses.length + 1 : guesses.length;
  const attemptsLeft = MAX_GUESSES - rowCount;

  // Build grid rows
  const rows = Array.from({ length: rowCount }, (_, r) => {
    const isSubmitted  = r < guesses.length;
    const isCurrentRow = r === guesses.length && gameState === "playing";
    const letters = isSubmitted
      ? guesses[r].split("")
      : isCurrentRow
        ? [...current.split(""), ...Array(wordLen - current.length).fill("")]
        : Array(wordLen).fill("");
    const scores = isSubmitted ? scoreGuess(guesses[r], answer) : null;

    return (
      <div
        key={r}
        className={[
          "wl-row",
          shake && isCurrentRow ? "wl-row--shake" : "",
          bounce && r < guesses.length && guesses[r] === answer ? "wl-row--bounce" : "",
        ].filter(Boolean).join(" ")}
      >
        {Array.from({ length: wordLen }, (_, c) => {
          const letter = letters[c] || "";
          const score  = scores ? scores[c] : null;
          return (
            <div
              key={c}
              className={[
                "wl-tile",
                letter && !score  ? "wl-tile--filled"   : "",
                score             ? `wl-tile--${score}` : "",
              ].filter(Boolean).join(" ")}
              style={score ? { animationDelay: `${c * 80}ms` } : undefined}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="wl-root">
      {/* Clue */}
      <div className="wl-clue">
        <span className="wl-clue-label">Clue</span>
        <p className="wl-clue-text">{card.clue}</p>
        <span className="wl-clue-hint">{wordLen} letters</span>
      </div>

      {/* Grid */}
      <div className="wl-grid">{rows}</div>

      {/* Remaining attempts indicator */}
      {gameState === "playing" && attemptsLeft > 0 && (
        <div className="wl-remaining" aria-label={`${attemptsLeft} attempts remaining`}>
          {Array.from({ length: attemptsLeft }, (_, i) => (
            <span key={i} className="wl-remaining-dot" />
          ))}
        </div>
      )}

      {/* Hints */}
      {gameState === "playing" && (
        <div className="wl-hint-bar">
          {[...hintedPositions].sort((a, b) => a - b).map(pos => (
            <span key={pos} className="wl-hint-chip">
              Letter {pos + 1}: <strong>{answer[pos]}</strong>
            </span>
          ))}
          {hintedPositions.size < MAX_HINTS && (
            <button className="wl-hint-btn" onClick={useHint}>
              💡 Hint{hintedPositions.size > 0 ? ` (${MAX_HINTS - hintedPositions.size} left)` : ""}
            </button>
          )}
        </div>
      )}

      {/* Result banner */}
      {gameState !== "playing" && (
        <div className={`wl-result wl-result--${gameState}`}>
          {gameState === "won" ? (
            <>
              <span className="wl-result-icon">🎉</span>
              <span className="wl-result-msg">
                {guesses.length === 1 ? "First try!" : `Solved in ${guesses.length}!`}
              </span>
            </>
          ) : (
            <>
              <span className="wl-result-icon">💡</span>
              <span className="wl-result-msg">The answer was <strong>{answer}</strong></span>
            </>
          )}
          <button className="wl-next-btn" onClick={handleNext}>Next →</button>
        </div>
      )}

      {/* On-screen keyboard */}
      <div className="wl-keyboard">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="wl-kb-row">
            {row.map(key => (
              <button
                key={key}
                className={[
                  "wl-key",
                  key === "ENTER" || key === "⌫" ? "wl-key--wide" : "",
                  usedLetters[key] ? `wl-key--${usedLetters[key]}` : "",
                ].filter(Boolean).join(" ")}
                onClick={() => handleKey(key)}
                aria-label={key}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
