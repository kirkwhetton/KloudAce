import { useState, useEffect } from "react";
import "./Connections.css";

const COLOUR_ORDER = ["yellow", "green", "blue", "purple"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Connections({ card, onKnow, onSrsRate }) {
  const cats = card.categories; // [{ name, colour, items[] }]

  const allTiles = cats.flatMap(c =>
    c.items.map(item => ({ item, cat: c.name, colour: c.colour }))
  );

  const [tiles,    setTiles]    = useState(() => shuffle(allTiles));
  const [selected, setSelected] = useState([]);
  const [solved,   setSolved]   = useState([]);
  const [lives,    setLives]    = useState(4);
  const [shaking,  setShaking]  = useState(false);
  const [oneAway,  setOneAway]  = useState(false);
  const [won,      setWon]      = useState(false);
  const [lost,     setLost]     = useState(false);
  const [tried,    setTried]    = useState(new Set());

  useEffect(() => {
    if (!oneAway) return;
    const t = setTimeout(() => setOneAway(false), 2000);
    return () => clearTimeout(t);
  }, [oneAway]);

  const remaining   = tiles.filter(t => !solved.includes(t.cat));
  const solvedCats  = cats
    .filter(c => solved.includes(c.name))
    .sort((a, b) => COLOUR_ORDER.indexOf(a.colour) - COLOUR_ORDER.indexOf(b.colour));

  const toggle = (item) => {
    if (shaking || won || lost) return;
    setSelected(s =>
      s.includes(item) ? s.filter(i => i !== item)
      : s.length < 4   ? [...s, item]
      : s
    );
  };

  const handleShuffle = () => {
    setTiles(prev => {
      const rem = prev.filter(t => !solved.includes(t.cat));
      const sol = prev.filter(t =>  solved.includes(t.cat));
      return [...sol, ...shuffle(rem)];
    });
  };

  const handleSubmit = () => {
    if (selected.length !== 4 || shaking) return;

    const key = [...selected].sort().join("||");
    if (tried.has(key)) { triggerShake(false); return; }
    setTried(p => new Set([...p, key]));

    const catNames = selected.map(item => tiles.find(t => t.item === item).cat);
    const unique   = new Set(catNames);

    if (unique.size === 1) {
      const name = catNames[0];
      const next = [...solved, name];
      setSolved(next);
      setSelected([]);
      if (next.length === cats.length) setWon(true);
    } else {
      const counts = catNames.reduce((a, n) => ({ ...a, [n]: (a[n] || 0) + 1 }), {});
      if (Math.max(...Object.values(counts)) === 3) setOneAway(true);
      const newLives = lives - 1;
      setLives(newLives);
      triggerShake(newLives === 0);
    }
  };

  const triggerShake = (willLose) => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setSelected([]);
      if (willLose) {
        setLost(true);
        setSolved(cats.map(c => c.name));
      }
    }, 600);
  };

  const handleNext = () => onSrsRate ? onSrsRate(won ? 4 : 1) : onKnow();

  return (
    <div className="connections-card">
      {card.title && <p className="connections-game-title">{card.title}</p>}
      <p className="connections-instruction">Create four groups of four!</p>

      {/* Solved category rows */}
      <div className="connections-solved">
        {solvedCats.map(c => (
          <div key={c.name} className={`connections-solved-row connections-colour--${c.colour}`}>
            <strong>{c.name.toUpperCase()}</strong>
            <span>{c.items.join(", ")}</span>
          </div>
        ))}
      </div>

      {/* Tile grid */}
      {!won && !lost && (
        <div className="connections-grid">
          {remaining.map(({ item }) => (
            <button
              key={item}
              onClick={() => toggle(item)}
              className={[
                "connections-tile",
                selected.includes(item)               && "connections-tile--selected",
                shaking && selected.includes(item)    && "connections-tile--shake",
              ].filter(Boolean).join(" ")}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* One away hint */}
      {oneAway && <p className="connections-one-away">One away!</p>}

      {/* Mistakes remaining */}
      <div className="connections-lives">
        <span className="connections-lives-label">Mistakes remaining:</span>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className={`connections-life${i < lives ? " connections-life--on" : ""}`} />
        ))}
      </div>

      {/* Controls */}
      {!won && !lost && (
        <div className="connections-controls">
          <button className="connections-btn connections-btn--ghost" onClick={handleShuffle}>
            Shuffle
          </button>
          <button
            className="connections-btn connections-btn--ghost"
            onClick={() => setSelected([])}
            disabled={!selected.length}
          >
            Deselect all
          </button>
          <button
            className="connections-btn connections-btn--primary"
            onClick={handleSubmit}
            disabled={selected.length !== 4}
          >
            Submit
          </button>
        </div>
      )}

      {/* Result */}
      {(won || lost) && (
        <div className="connections-result">
          <p className="connections-result-msg">
            {won ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true" style={{ verticalAlign: "middle", marginRight: "0.4rem" }}>
                  <path d="M8 21h8M12 17v4M7 4H4a2 2 0 0 0-2 2v1c0 2.5 1.5 4.6 3.5 5.5"/>
                  <path d="M17 4h3a2 2 0 0 1 2 2v1c0 2.5-1.5 4.6-3.5 5.5"/>
                  <path d="M7 4h10v9a5 5 0 0 1-10 0V4z"/>
                </svg>
                Solved!
              </>
            ) : "Better luck next time!"}
          </p>
          <button className="connections-btn connections-btn--primary" onClick={handleNext}>
            Next →
          </button>
        </div>
      )}

      {!card.id?.toString().startsWith("CUSTOM:") && <span className="card-id-badge">#{card.id}</span>}
    </div>
  );
}
