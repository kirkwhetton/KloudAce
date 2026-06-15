import React, { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon, CrossIcon, TrashIcon, PencilIcon, FolderIcon } from "./Icons";

const loadDecks = () => JSON.parse(localStorage.getItem("customDecks") || "[]");
const saveDecks = (decks) => localStorage.setItem("customDecks", JSON.stringify(decks));

const DECK_COLOURS = [
  { from: "#f59e0b", to: "#b45309" },
  { from: "#10b981", to: "#065f46" },
  { from: "#ec4899", to: "#9d174d" },
  { from: "#3b82f6", to: "#1e3a8a" },
  { from: "#8b5cf6", to: "#4c1d95" },
  { from: "#ef4444", to: "#7f1d1d" },
  { from: "#06b6d4", to: "#164e63" },
  { from: "#84cc16", to: "#365314" },
];

const DIFFICULTIES = [
  { value: "easy",    label: "Easy" },
  { value: "medium",  label: "Medium" },
  { value: "hard",    label: "Hard" },
  { value: "extreme", label: "Extreme" },
];

function FlashcardForm({ onSave }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tag, setTag] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleAdd = () => {
    if (question.trim() && answer.trim()) {
      onSave({ id: Date.now(), question: question.trim(), answer: answer.trim(), tag: tag.trim(), difficulty });
      setQuestion(""); setAnswer(""); setTag(""); setDifficulty("medium");
    }
  };

  return (
    <div className="cd-card-form">
      <label className="profile-label">
        Question
        <input className="profile-input" type="text" placeholder="e.g. What is Azure RBAC?"
          value={question} onChange={e => setQuestion(e.target.value)} />
      </label>
      <label className="profile-label">
        Answer
        <input className="profile-input" type="text" placeholder="e.g. Role-Based Access Control"
          value={answer} onChange={e => setAnswer(e.target.value)} />
      </label>
      <label className="profile-label">
        Tag <span style={{ fontWeight: 400, opacity: 0.6 }}>(optional)</span>
        <input className="profile-input" type="text" placeholder="e.g. networking"
          value={tag} onChange={e => setTag(e.target.value)} />
      </label>
      <label className="profile-label">
        Difficulty
        <select className="profile-input cd-difficulty-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </label>
      <button type="button" className="cd-add-card-btn" onClick={handleAdd}
        disabled={!question.trim() || !answer.trim()}>
        + Add Card
      </button>
    </div>
  );
}

function CreateTab({ onSave }) {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [saved, setSaved] = useState(false);

  const addCard = (card) => setCards(prev => [...prev, card]);
  const removeCard = (id) => setCards(prev => prev.filter(c => c.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && cards.length > 0) {
      onSave({ id: Date.now(), name: name.trim(), cards });
      setName(""); setCards([]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <label className="profile-label">
        Deck Name
        <input className="profile-input" type="text" placeholder="e.g. Azure Networking"
          value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <div className="cd-section-label">Add a flashcard</div>
      <FlashcardForm onSave={addCard} />
      {cards.length > 0 && (
        <div className="cd-preview-list">
          <div className="cd-section-label">Cards in this deck ({cards.length})</div>
          {cards.map(card => (
            <div key={card.id} className="cd-preview-item">
              <span className="cd-preview-q">{card.question}</span>
              <span className="cd-preview-sep"><ArrowRightIcon /></span>
              <span className="cd-preview-a">{card.answer}</span>
              <button type="button" className="cd-preview-remove" onClick={() => removeCard(card.id)} title="Remove"><CrossIcon /></button>
            </div>
          ))}
        </div>
      )}
      {saved && <p className="profile-msg ok">Deck saved!</p>}
      <button type="submit" className="profile-save-btn" disabled={!name.trim() || cards.length === 0}>
        Save Deck
      </button>
    </form>
  );
}

// ── Edit deck view ───────────────────────────────────────────
function EditDeckView({ deck, onSave, onBack }) {
  const [name, setName] = useState(deck.name);
  // Each card has an extra `_idDraft` string field for the ID input so typing
  // doesn't trigger re-keying or mid-type number conversion.
  const [cards, setCards] = useState(deck.cards.map(c => ({ ...c, _idDraft: String(c.id ?? "") })));
  const [saved, setSaved] = useState(false);

  const updateCard = (idx, field, value) =>
    setCards(prev => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));

  const updateIdDraft = (idx, raw) =>
    setCards(prev => prev.map((c, i) => i === idx ? { ...c, _idDraft: raw } : c));

  const removeCard = (idx) => setCards(prev => prev.filter((_, i) => i !== idx));

  const addCard = (card) => setCards(prev => [...prev, { ...card, _idDraft: String(card.id ?? "") }]);

  const handleSave = () => {
    if (!name.trim() || cards.length === 0) return;
    // Resolve each card's draft ID back to a typed value, strip internal field
    const finalCards = cards.map(({ _idDraft, ...c }) => {
      const raw = _idDraft.trim();
      const id = raw === "" ? c.id : isNaN(Number(raw)) ? raw : Number(raw);
      return { ...c, id };
    });
    onSave({ ...deck, name: name.trim(), cards: finalCards });
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 1200);
  };

  return (
    <div className="cd-edit-view">
      <button type="button" className="cd-edit-back" onClick={onBack}><ArrowLeftIcon /> Back to decks</button>
      <label className="profile-label" style={{ marginBottom: "0.75rem" }}>
        Deck Name
        <input className="profile-input" type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <div className="cd-section-label">Cards ({cards.length})</div>
      <div className="cd-edit-card-list">
        {cards.map((card, i) => (
          <div key={i} className="cd-edit-card-row">
            <span className="cd-edit-card-num">{i + 1}</span>
            <div className="cd-edit-card-fields">
              <input className="profile-input cd-edit-input cd-edit-input--id" type="text" placeholder="Card ID (optional)"
                value={card._idDraft}
                onChange={e => updateIdDraft(i, e.target.value)} />
              <input className="profile-input cd-edit-input" type="text" placeholder="Question"
                value={card.question} onChange={e => updateCard(i, "question", e.target.value)} />
              <input className="profile-input cd-edit-input" type="text" placeholder="Answer"
                value={card.answer} onChange={e => updateCard(i, "answer", e.target.value)} />
              <input className="profile-input cd-edit-input" type="text" placeholder="Tag (optional)"
                value={card.tag || ""} onChange={e => updateCard(i, "tag", e.target.value)} />
              <select className="profile-input cd-edit-input cd-difficulty-select"
                value={card.difficulty || "medium"} onChange={e => updateCard(i, "difficulty", e.target.value)}>
                {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>
            <button type="button" className="cd-delete-btn" onClick={() => removeCard(i)} title="Remove"><TrashIcon /></button>
          </div>
        ))}
      </div>
      <div className="cd-section-label" style={{ marginTop: "0.75rem" }}>Add a card</div>
      <FlashcardForm onSave={addCard} />
      {saved && <p className="profile-msg ok">Saved!</p>}
      <button type="button" className="profile-save-btn" style={{ marginTop: "0.75rem" }}
        disabled={!name.trim() || cards.length === 0} onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}

function DecksTab({ decks, onStudy, onDelete, onEdit }) {
  if (decks.length === 0) {
    return <p className="cd-empty">No decks yet — switch to the Create tab to make one!</p>;
  }
  return (
    <div className="cd-decks-list">
      {decks.map((deck, i) => {
        const col = DECK_COLOURS[i % DECK_COLOURS.length];
        const initials = deck.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
        return (
          <div key={deck.id} className="cd-deck-entry">
            <div className="cd-deck-avatar" style={{ background: `linear-gradient(135deg, ${col.from}, ${col.to})` }}>
              {initials}
            </div>
            <div className="cd-deck-info">
              <span className="cd-deck-name">{deck.name}</span>
              <span className="cd-deck-meta">{deck.cards.length} card{deck.cards.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="cd-deck-actions">
              <button className="cd-study-btn" onClick={() => onStudy(deck)}>Study</button>
              <button className="cd-edit-btn" onClick={() => onEdit(deck)} title="Edit deck"><PencilIcon /></button>
              <button className="cd-delete-btn" onClick={() => onDelete(deck.id)} title="Delete"><TrashIcon /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CustomDecks({ onClose, onStudy, initialEditDeckId }) {
  const [decks, setDecks] = useState([]);
  const [tab, setTab] = useState("decks");
  const [editingDeck, setEditingDeck] = useState(null);

  useEffect(() => {
    const loaded = loadDecks();
    setDecks(loaded);
    // If opened from the "Edit" button on a flashcard, jump straight to that deck's edit view
    if (initialEditDeckId != null) {
      const target = loaded.find(d => d.id === initialEditDeckId);
      if (target) setEditingDeck(target);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addDeck = (deck) => {
    const updated = [...decks, deck];
    setDecks(updated); saveDecks(updated);
    setTab("decks");
  };

  const deleteDeck = (id) => {
    const updated = decks.filter(d => d.id !== id);
    setDecks(updated); saveDecks(updated);
  };

  const saveDeckEdits = (updatedDeck) => {
    const updated = decks.map(d => d.id === updatedDeck.id ? updatedDeck : d);
    setDecks(updated); saveDecks(updated);
  };

  if (editingDeck) {
    return (
      <div className="profile-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
        <div className="profile-modal cd-modal">
          <button className="profile-close" onClick={onClose} title="Close"><CrossIcon /></button>
          <EditDeckView
            deck={editingDeck}
            onSave={saveDeckEdits}
            onBack={() => setEditingDeck(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="profile-modal cd-modal">
        <button className="profile-close" onClick={onClose} title="Close"><CrossIcon /></button>

        <div className="profile-header">
          <div className="profile-avatar" style={{ fontSize: "1.4rem" }}><FolderIcon size={20} /></div>
          <div>
            <h2 className="profile-name">My Cards</h2>
            <p className="profile-email">{decks.length} custom deck{decks.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button className={`profile-tab${tab === "decks" ? " active" : ""}`} onClick={() => setTab("decks")}>My Decks</button>
          <button className={`profile-tab${tab === "create" ? " active" : ""}`} onClick={() => setTab("create")}>+ Create</button>
        </div>
        {tab === "decks" && <DecksTab decks={decks} onStudy={onStudy} onDelete={deleteDeck} onEdit={setEditingDeck} />}
        {tab === "create" && <CreateTab onSave={addDeck} />}
      </div>
    </div>
  );
}