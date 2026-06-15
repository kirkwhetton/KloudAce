import { useState } from "react";
import { BookIcon, RefreshIcon, CheckIcon, EyeOffIcon, NeutralFaceIcon } from "../components/Icons";
import "./Flashcard.css";

function Flashcard({ card, onKnow, onSrsRate, hideAnswers, examMode, onExamAnswer, hideDifficulty, onSaveCard, decks, displayId, onAnswer }) {
  const [flipped, setFlipped] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editTag, setEditTag] = useState("");
  const [editDeckId, setEditDeckId] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("medium");
  const [newDeckName, setNewDeckName] = useState("");

  const handleFlip = () => {
    if (editing) return;
    if (examMode) { onExamAnswer({ card, correct: null, given: null, expected: card.answer }); return; }
    if (!hideAnswers) setFlipped((f) => !f);
  };
  const handleReview = () => setFlipped(false);
  const srsMode = !!onSrsRate;

  const openEdit = () => {
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    setEditTag(card.tag || "");
    setEditDeckId(card.exam?.startsWith("CUSTOM:") ? card.exam.slice("CUSTOM:".length) : "");
    setEditDifficulty(card.difficulty || "medium");
    setNewDeckName("");
    setEditing(true);
  };

  const saveEdit = () => {
    if (!editQuestion.trim() || !editAnswer.trim()) return;
    onSaveCard?.({ question: editQuestion.trim(), answer: editAnswer.trim(), tag: editTag.trim(), deckId: editDeckId, difficulty: editDifficulty, newDeckName: newDeckName.trim() });
    setEditing(false);
  };

  const difficultyLabels = { easy: "Easy", medium: "Medium", hard: "Hard", extreme: "Extreme" };
  const difficultyBadge = card.difficulty && !hideDifficulty
    ? <span className={`difficulty-badge difficulty-badge--on-card difficulty-${card.difficulty}`}>{difficultyLabels[card.difficulty]}</span>
    : null;

  return (
    <div className="flashcard-scene" onClick={handleFlip} style={hideAnswers ? { cursor: "default" } : {}}>
      <div className={`flashcard${flipped ? " flipped" : ""}`}>
        {/* Invisible sizer */}
        <div className="flashcard-sizer" aria-hidden="true">
          <div className="flashcard-sizer-front">
            {difficultyBadge}
            <span className="category-badge">{card.category}</span>
            <p className="card-text question">{card.question}</p>
            <span className="flip-hint">Click to reveal answer</span>
            {displayId && <span className="card-id-badge">#{displayId}</span>}
          </div>
          <div className="flashcard-sizer-back">
            {difficultyBadge}
            <span className="category-badge">{card.category}</span>
            <p className="card-text answer">{card.answer}</p>
            {card.learnUrl && <span className="learn-more-link"><BookIcon /> Learn more on Microsoft Learn</span>}
            <div className="action-buttons">
              <button className="btn btn-review"><RefreshIcon /> Review Again</button>
              <button className="btn btn-know"><CheckIcon /> Next Card</button>
            </div>
            {displayId && <span className="card-id-badge">#{displayId}</span>}
          </div>
        </div>

        {/* Front */}
        <div className="flashcard-face flashcard-front">
          {difficultyBadge}
          <span className="category-badge">{card.category}</span>
          <p className="card-text question">{card.question}</p>
          {card.tag && <span className="card-tag-badge">{card.tag}</span>}
          {examMode
            ? <span className="flip-hint">Click to move to next card</span>
            : hideAnswers
            ? <span className="flip-hint" style={{ opacity: 0.5 }}><EyeOffIcon /> Hide answers is on</span>
            : <span className="flip-hint">Click to reveal answer</span>
          }
          {displayId && <span className="card-id-badge">#{displayId}</span>}
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back">
          {difficultyBadge}
          <span className="category-badge">{card.category}</span>
          <p className="card-text answer">{card.answer}</p>
          {card.tag && <span className="card-tag-badge">{card.tag}</span>}
          {card.learnUrl && (
            <a className="learn-more-link" href={card.learnUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
              <BookIcon /> Learn more on Microsoft Learn
            </a>
          )}
          <div
            className="action-buttons"
            onClick={(e) => e.stopPropagation()}
            style={flipped ? {} : { visibility: "hidden", pointerEvents: "none" }}
          >
            {srsMode ? (
              <div className="srs-rating">
                <p className="srs-rating-label">Did you know this?</p>
                <div className="srs-rating-btns">
                  <button className="srs-btn srs-1" onClick={() => onSrsRate(1)}>
                    <span className="srs-emoji"><NeutralFaceIcon /></span>
                    <span className="srs-label">Didn't Know</span>
                  </button>
                  <button className="srs-btn srs-3" onClick={() => { handleReview(); onSrsRate(3); }}>
                    <span className="srs-emoji known-check"><CheckIcon /></span>
                    <span className="srs-label">Got It</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button className="btn btn-review" onClick={handleReview}><RefreshIcon /> Review Again</button>
                <button className="btn btn-know" onClick={onKnow}><span className="known-check"><CheckIcon /></span> Next Card</button>
              </>
            )}
          </div>
          {displayId && <span className="card-id-badge">#{displayId}</span>}
        </div>
      </div>

      {/* Edit bar / inline edit panel */}
      {onSaveCard && (
        <div onClick={e => e.stopPropagation()}>
          {!editing ? (
            <div className="flashcard-edit-bar">
              <button className="flashcard-edit-btn" onClick={openEdit}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/>
                </svg>
                Edit card
              </button>
            </div>
          ) : (
            <div className="fie-panel">
              <div className="fie-row">
                <label className="fie-label">Deck</label>
                <select className="fie-select" value={editDeckId} onChange={e => { setEditDeckId(e.target.value); setNewDeckName(""); }}>
                  {decks?.map(d => <option key={d.id} value={String(d.id)}>{d.name}</option>)}
                  <option value="__new__">+ New deck…</option>
                </select>
                {editDeckId === "__new__" && (
                  <input className="fie-input" type="text" placeholder="New deck name" value={newDeckName} onChange={e => setNewDeckName(e.target.value)} autoFocus />
                )}
              </div>
              <div className="fie-row">
                <label className="fie-label">Question</label>
                <textarea className="fie-textarea" rows={3} value={editQuestion} onChange={e => setEditQuestion(e.target.value)} />
              </div>
              <div className="fie-row">
                <label className="fie-label">Answer</label>
                <textarea className="fie-textarea" rows={3} value={editAnswer} onChange={e => setEditAnswer(e.target.value)} />
              </div>
              <div className="fie-row">
                <label className="fie-label">Tag</label>
                <input className="fie-input" type="text" value={editTag} onChange={e => setEditTag(e.target.value)} placeholder="e.g. networking" />
              </div>
              <div className="fie-row">
                <label className="fie-label">Difficulty</label>
                <select className="fie-select" value={editDifficulty} onChange={e => setEditDifficulty(e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              <div className="fie-actions">
                <button className="fie-btn fie-btn--cancel" onClick={() => setEditing(false)}>Cancel</button>
                <button className="fie-btn fie-btn--save" onClick={saveEdit} disabled={!editQuestion.trim() || !editAnswer.trim() || (editDeckId === "__new__" && !newDeckName.trim())}>Save</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Flashcard;
