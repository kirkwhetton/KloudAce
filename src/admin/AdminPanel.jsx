import { useState } from "react";
import { supabase } from "../auth/supabase";
import { CrossIcon, ArrowRightIcon, CheckIcon } from "../components/Icons";
import "./AdminPanel.css";

const EXAMS       = ["AZ-900", "AZ-104", "AZ-305", "AZ-700"];
const DIFFICULTIES = ["easy", "medium", "hard", "extreme"];
const TYPES        = ["mcq", "true-false", "flashcard", "image-mcq", "hotspot", "task"];
const TASK_TYPES   = ["fill-in", "order", "match", "script"];

// ── Blank state factories ─────────────────────────────────────────

function blank(overrides) {
  return { exam: "AZ-104", category: "", difficulty: "medium", is_free: false, ...overrides };
}

function blankForType(type, taskType = "fill-in") {
  if (type === "mcq")        return blank({ type: "mcq",        question: "", choices: ["","","",""], correctAnswer: 0, answer: "", explanation: "", learnUrl: "" });
  if (type === "true-false") return blank({ type: "true-false", question: "", correctAnswer: true, answer: "", explanation: "", learnUrl: "" });
  if (type === "flashcard")  return blank({ type: "flashcard",  question: "", answer: "" });
  if (type === "image-mcq")  return blank({ type: "image-mcq",  question: "", svgCode: "", imageAlt: "", choices: ["","","",""], correctAnswer: 0, answer: "", explanation: "", learnUrl: "" });
  if (type === "hotspot")    return blank({ type: "hotspot",    question: "", svgCode: "", imageAlt: "", viewBox: "0 0 680 320", zones: [{ id: "zone-1", label: "", x: 0, y: 0, width: 100, height: 50 }], correctZone: "", answer: "", explanation: "", learnUrl: "" });
  if (type === "task") {
    if (taskType === "fill-in") return blank({ type: "task", taskType: "fill-in", question: "", blanks: [{ label: "", answer: "", hint: "" }], explanation: "" });
    if (taskType === "order")   return blank({ type: "task", taskType: "order",   question: "", steps: ["", ""], explanation: "" });
    if (taskType === "match")   return blank({ type: "task", taskType: "match",   question: "", pairs: [{ left: "", right: "" }], explanation: "" });
    if (taskType === "script")  return blank({ type: "task", taskType: "script",  question: "", shell: "bash", requiredTokens: [""], modelAnswer: "", helpText: "", placeholder: "", explanation: "" });
  }
  return blankForType("mcq");
}

// ── Build Supabase row ────────────────────────────────────────────

function buildRow(form) {
  const { type, taskType, exam, category, difficulty, is_free } = form;
  const id = `${exam}-${Date.now()}`;
  let data = {};

  if (type === "mcq") {
    data = { question: form.question, choices: form.choices, correctAnswer: form.correctAnswer, answer: form.answer, explanation: form.explanation, learnUrl: form.learnUrl };
  } else if (type === "true-false") {
    data = { question: form.question, correctAnswer: form.correctAnswer, answer: form.answer, explanation: form.explanation, learnUrl: form.learnUrl };
  } else if (type === "flashcard") {
    data = { question: form.question, answer: form.answer };
  } else if (type === "image-mcq") {
    data = { question: form.question, diagram: form.svgCode, imageAlt: form.imageAlt, choices: form.choices, correctAnswer: form.correctAnswer, answer: form.answer, explanation: form.explanation, learnUrl: form.learnUrl };
  } else if (type === "hotspot") {
    data = { question: form.question, diagram: form.svgCode, imageAlt: form.imageAlt, viewBox: form.viewBox, zones: form.zones, correctZone: form.correctZone, answer: form.answer, explanation: form.explanation, learnUrl: form.learnUrl };
  } else if (type === "task") {
    data = { question: form.question, taskType, explanation: form.explanation };
    if (taskType === "fill-in") data.blanks = form.blanks;
    if (taskType === "order")   data.steps  = form.steps;
    if (taskType === "match")   data.pairs  = form.pairs;
    if (taskType === "script")  Object.assign(data, { shell: form.shell, requiredTokens: form.requiredTokens.filter(t => t.trim()), modelAnswer: form.modelAnswer, helpText: form.helpText, placeholder: form.placeholder });
  }

  return { id, exam, category: (category || "General").trim(), type, difficulty, is_free, data };
}

// ── Validation ────────────────────────────────────────────────────

function validateRow(row) {
  const errs = [];
  if (!row.id)   errs.push("missing id");
  if (!row.exam) errs.push("missing exam");
  if (!row.type) errs.push("missing type");
  if (!row.data?.question?.trim()) errs.push("missing question");
  if (row.type === "mcq" || row.type === "image-mcq") {
    if (!Array.isArray(row.data.choices) || row.data.choices.length < 2) errs.push("needs at least 2 choices");
    if (typeof row.data.correctAnswer !== "number") errs.push("needs numeric correctAnswer");
  }
  if (row.type === "true-false" && typeof row.data.correctAnswer !== "boolean") errs.push("true-false needs boolean correctAnswer");
  if ((row.type === "image-mcq" || row.type === "hotspot") && !row.data.diagram) errs.push("missing SVG diagram");
  if (row.type === "hotspot") {
    if (!row.data.zones?.length) errs.push("needs at least one zone");
    if (!row.data.correctZone)   errs.push("missing correctZone");
  }
  if (row.type === "task") {
    const tt = row.data.taskType;
    if (tt === "fill-in" && !row.data.blanks?.length)        errs.push("fill-in needs at least one blank");
    if (tt === "order"   && (row.data.steps?.length ?? 0) < 2) errs.push("order needs at least 2 steps");
    if (tt === "match"   && !row.data.pairs?.length)          errs.push("match needs at least one pair");
    if (tt === "script"  && !row.data.requiredTokens?.length) errs.push("script needs at least one required token");
  }
  return errs;
}

// ── Shared field helpers ──────────────────────────────────────────

function McqChoices({ choices, correctAnswer, onChange, onCorrectChange }) {
  return (
    <div className="ap-choices">
      <span className="ap-label-text">Choices <span className="ap-hint-inline">(select correct)</span></span>
      {choices.map((c, i) => (
        <label key={i} className="ap-choice-row">
          <input type="radio" name="correctAnswer" checked={correctAnswer === i} onChange={() => onCorrectChange(i)} className="ap-radio" />
          <input className="ap-input" value={c} onChange={e => onChange(i, e.target.value)} placeholder={`Choice ${String.fromCharCode(65 + i)}`} />
        </label>
      ))}
    </div>
  );
}

function SvgField({ value, onChange }) {
  return (
    <label className="ap-label">
      SVG diagram code
      <textarea className="ap-input ap-textarea ap-json" value={value} onChange={e => onChange(e.target.value)} rows={8} placeholder={'<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg">...</svg>'} spellCheck={false} />
    </label>
  );
}

function CommonTailFields({ form, set }) {
  return (<>
    <label className="ap-label">
      Short answer
      <input className="ap-input" value={form.answer} onChange={e => set("answer", e.target.value)} placeholder="Brief correct answer…" />
    </label>
    <label className="ap-label">
      Explanation
      <textarea className="ap-input ap-textarea" value={form.explanation} onChange={e => set("explanation", e.target.value)} rows={3} placeholder="Why is this correct?" />
    </label>
    <label className="ap-label">
      Learn URL <span className="ap-optional">(optional)</span>
      <input className="ap-input" value={form.learnUrl} onChange={e => set("learnUrl", e.target.value)} placeholder="https://learn.microsoft.com/…" />
    </label>
  </>);
}

// ── Single card form ──────────────────────────────────────────────

function SingleCardForm() {
  const [form, setForm]     = useState(blankForType("mcq"));
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleTypeChange = (type) => setForm(blankForType(type, form.taskType));
  const handleTaskTypeChange = (tt) => setForm(blankForType("task", tt));

  // MCQ choice helpers
  const setChoice = (i, val) => setForm(f => { const c = [...f.choices]; c[i] = val; return { ...f, choices: c }; });

  // Hotspot zone helpers
  const setZone    = (i, key, val) => setForm(f => { const z = f.zones.map((z,idx) => idx===i ? {...z,[key]:val} : z); return {...f,zones:z}; });
  const addZone    = () => setForm(f => ({ ...f, zones: [...f.zones, { id: `zone-${f.zones.length+1}`, label: "", x: 0, y: 0, width: 100, height: 50 }] }));
  const removeZone = (i) => setForm(f => ({ ...f, zones: f.zones.filter((_,idx)=>idx!==i) }));

  // Fill-in blank helpers
  const setBlank    = (i, key, val) => setForm(f => { const b = f.blanks.map((b,idx) => idx===i ? {...b,[key]:val} : b); return {...f,blanks:b}; });
  const addBlank    = () => setForm(f => ({ ...f, blanks: [...f.blanks, { label:"", answer:"", hint:"" }] }));
  const removeBlank = (i) => setForm(f => ({ ...f, blanks: f.blanks.filter((_,idx)=>idx!==i) }));

  // Order step helpers
  const setStep    = (i, val) => setForm(f => { const s = f.steps.map((s,idx) => idx===i?val:s); return {...f,steps:s}; });
  const addStep    = () => setForm(f => ({ ...f, steps: [...f.steps, ""] }));
  const removeStep = (i) => setForm(f => ({ ...f, steps: f.steps.filter((_,idx)=>idx!==i) }));

  // Match pair helpers
  const setPair    = (i, key, val) => setForm(f => { const p = f.pairs.map((p,idx) => idx===i?{...p,[key]:val}:p); return {...f,pairs:p}; });
  const addPair    = () => setForm(f => ({ ...f, pairs: [...f.pairs, { left:"", right:"" }] }));
  const removePair = (i) => setForm(f => ({ ...f, pairs: f.pairs.filter((_,idx)=>idx!==i) }));

  // Script token helpers
  const setToken    = (i, val) => setForm(f => { const t = f.requiredTokens.map((t,idx) => idx===i?val:t); return {...f,requiredTokens:t}; });
  const addToken    = () => setForm(f => ({ ...f, requiredTokens: [...f.requiredTokens, ""] }));
  const removeToken = (i) => setForm(f => ({ ...f, requiredTokens: f.requiredTokens.filter((_,idx)=>idx!==i) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const row = buildRow(form);
    const errs = validateRow(row);
    if (errs.length) { setStatus({ ok: false, text: errs.join(", ") }); return; }
    setSaving(true);
    try {
      const { error } = await supabase.from("cards").insert(row);
      if (error) { setStatus({ ok: false, text: `Supabase error: ${error.message} (code: ${error.code})` }); return; }
      setStatus({ ok: true, text: `Card ${row.id} saved.` });
      setForm(blankForType(form.type, form.taskType));
    } catch (err) {
      setStatus({ ok: false, text: `Unexpected error: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="ap-form" onSubmit={handleSubmit}>

      {/* ── Common top row ── */}
      <div className="ap-row-4">
        <label className="ap-label">
          Exam
          <select className="ap-input" value={form.exam} onChange={e => set("exam", e.target.value)}>
            {EXAMS.map(ex => <option key={ex}>{ex}</option>)}
          </select>
        </label>
        <label className="ap-label">
          Type
          <select className="ap-input" value={form.type} onChange={e => handleTypeChange(e.target.value)}>
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="ap-label">
          Difficulty
          <select className="ap-input" value={form.difficulty} onChange={e => set("difficulty", e.target.value)}>
            {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
          </select>
        </label>
        <label className="ap-label">
          Category
          <input className="ap-input" value={form.category} onChange={e => set("category", e.target.value)} placeholder="e.g. Networking" />
        </label>
      </div>

      {/* ── Task sub-type selector ── */}
      {form.type === "task" && (
        <label className="ap-label">
          Task type
          <select className="ap-input ap-input--half" value={form.taskType} onChange={e => handleTaskTypeChange(e.target.value)}>
            {TASK_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>
      )}

      {/* ── Question (all types) ── */}
      <label className="ap-label">
        Question
        <textarea className="ap-input ap-textarea" value={form.question} onChange={e => set("question", e.target.value)} rows={3} placeholder="Question text…" />
      </label>

      {/* ══ Type-specific fields ══ */}

      {/* MCQ */}
      {form.type === "mcq" && (<>
        <McqChoices choices={form.choices} correctAnswer={form.correctAnswer} onChange={setChoice} onCorrectChange={v => set("correctAnswer", v)} />
        <CommonTailFields form={form} set={set} />
      </>)}

      {/* True / False */}
      {form.type === "true-false" && (<>
        <div className="ap-tf-row">
          <span className="ap-label-text">Correct answer</span>
          <label className="ap-radio-label"><input type="radio" checked={form.correctAnswer === true}  onChange={() => set("correctAnswer", true)}  /> True</label>
          <label className="ap-radio-label"><input type="radio" checked={form.correctAnswer === false} onChange={() => set("correctAnswer", false)} /> False</label>
        </div>
        <CommonTailFields form={form} set={set} />
      </>)}

      {/* Flashcard */}
      {form.type === "flashcard" && (
        <label className="ap-label">
          Answer
          <textarea className="ap-input ap-textarea" value={form.answer} onChange={e => set("answer", e.target.value)} rows={3} placeholder="Answer text…" />
        </label>
      )}

      {/* Image MCQ */}
      {form.type === "image-mcq" && (<>
        <SvgField value={form.svgCode} onChange={v => set("svgCode", v)} />
        <label className="ap-label">
          Image alt text
          <input className="ap-input" value={form.imageAlt} onChange={e => set("imageAlt", e.target.value)} placeholder="Brief description of the diagram" />
        </label>
        <McqChoices choices={form.choices} correctAnswer={form.correctAnswer} onChange={setChoice} onCorrectChange={v => set("correctAnswer", v)} />
        <CommonTailFields form={form} set={set} />
      </>)}

      {/* Hotspot */}
      {form.type === "hotspot" && (<>
        <SvgField value={form.svgCode} onChange={v => set("svgCode", v)} />
        <div className="ap-row-2">
          <label className="ap-label">
            Image alt text
            <input className="ap-input" value={form.imageAlt} onChange={e => set("imageAlt", e.target.value)} placeholder="Brief description of the diagram" />
          </label>
          <label className="ap-label">
            ViewBox
            <input className="ap-input" value={form.viewBox} onChange={e => set("viewBox", e.target.value)} placeholder="0 0 680 320" />
          </label>
        </div>

        <div className="ap-section-label">Clickable zones <span className="ap-hint-inline">(rectangle overlays on the SVG)</span></div>
        {form.zones.map((zone, i) => (
          <div key={i} className="ap-zone-row">
            <input className="ap-input ap-zone-id"    value={zone.id}     onChange={e => setZone(i,"id",e.target.value)}              placeholder="ID" />
            <input className="ap-input ap-zone-label" value={zone.label}  onChange={e => setZone(i,"label",e.target.value)}           placeholder="Label" />
            <input className="ap-input ap-zone-num"   value={zone.x}      onChange={e => setZone(i,"x",Number(e.target.value))}       placeholder="X"  type="number" />
            <input className="ap-input ap-zone-num"   value={zone.y}      onChange={e => setZone(i,"y",Number(e.target.value))}       placeholder="Y"  type="number" />
            <input className="ap-input ap-zone-num"   value={zone.width}  onChange={e => setZone(i,"width",Number(e.target.value))}   placeholder="W"  type="number" />
            <input className="ap-input ap-zone-num"   value={zone.height} onChange={e => setZone(i,"height",Number(e.target.value))}  placeholder="H"  type="number" />
            <button type="button" className="ap-remove-btn" onClick={() => removeZone(i)}><CrossIcon /></button>
          </div>
        ))}
        <button type="button" className="ap-add-btn" onClick={addZone}>+ Add zone</button>

        <label className="ap-label">
          Correct zone
          <select className="ap-input ap-input--half" value={form.correctZone} onChange={e => set("correctZone", e.target.value)}>
            <option value="">Select correct zone…</option>
            {form.zones.map(z => <option key={z.id} value={z.id}>{z.label || z.id}</option>)}
          </select>
        </label>
        <CommonTailFields form={form} set={set} />
      </>)}

      {/* Task — fill-in */}
      {form.type === "task" && form.taskType === "fill-in" && (<>
        <div className="ap-section-label">Blanks</div>
        {form.blanks.map((blank, i) => (
          <div key={i} className="ap-blank-row">
            <input className="ap-input" value={blank.label}  onChange={e => setBlank(i,"label",e.target.value)}  placeholder="Label (e.g. Resource group)" />
            <input className="ap-input" value={blank.answer} onChange={e => setBlank(i,"answer",e.target.value)} placeholder="Correct answer" />
            <input className="ap-input" value={blank.hint}   onChange={e => setBlank(i,"hint",e.target.value)}   placeholder="Hint (optional)" />
            <button type="button" className="ap-remove-btn" onClick={() => removeBlank(i)}><CrossIcon /></button>
          </div>
        ))}
        <button type="button" className="ap-add-btn" onClick={addBlank}>+ Add blank</button>
        <label className="ap-label">
          Explanation
          <textarea className="ap-input ap-textarea" value={form.explanation} onChange={e => set("explanation", e.target.value)} rows={3} placeholder="Why is this the correct answer?" />
        </label>
      </>)}

      {/* Task — order */}
      {form.type === "task" && form.taskType === "order" && (<>
        <div className="ap-section-label">Steps <span className="ap-hint-inline">(in correct order)</span></div>
        {form.steps.map((step, i) => (
          <div key={i} className="ap-list-row">
            <span className="ap-list-num">{i + 1}.</span>
            <input className="ap-input" value={step} onChange={e => setStep(i, e.target.value)} placeholder={`Step ${i+1}`} />
            <button type="button" className="ap-remove-btn" onClick={() => removeStep(i)} disabled={form.steps.length <= 2}><CrossIcon /></button>
          </div>
        ))}
        <button type="button" className="ap-add-btn" onClick={addStep}>+ Add step</button>
        <label className="ap-label">
          Explanation
          <textarea className="ap-input ap-textarea" value={form.explanation} onChange={e => set("explanation", e.target.value)} rows={3} placeholder="Why is this order correct?" />
        </label>
      </>)}

      {/* Task — match */}
      {form.type === "task" && form.taskType === "match" && (<>
        <div className="ap-section-label">Pairs</div>
        {form.pairs.map((pair, i) => (
          <div key={i} className="ap-pair-row">
            <input className="ap-input" value={pair.left}  onChange={e => setPair(i,"left",e.target.value)}  placeholder="Left item" />
            <span className="ap-pair-arrow"><ArrowRightIcon /></span>
            <input className="ap-input" value={pair.right} onChange={e => setPair(i,"right",e.target.value)} placeholder="Right item" />
            <button type="button" className="ap-remove-btn" onClick={() => removePair(i)}><CrossIcon /></button>
          </div>
        ))}
        <button type="button" className="ap-add-btn" onClick={addPair}>+ Add pair</button>
        <label className="ap-label">
          Explanation
          <textarea className="ap-input ap-textarea" value={form.explanation} onChange={e => set("explanation", e.target.value)} rows={3} placeholder="Explanation…" />
        </label>
      </>)}

      {/* Task — script */}
      {form.type === "task" && form.taskType === "script" && (<>
        <div className="ap-row-2">
          <label className="ap-label">
            Shell
            <select className="ap-input" value={form.shell} onChange={e => set("shell", e.target.value)}>
              <option value="bash">Bash / CLI</option>
              <option value="powershell">PowerShell</option>
            </select>
          </label>
          <label className="ap-label">
            Input placeholder <span className="ap-optional">(optional)</span>
            <input className="ap-input" value={form.placeholder} onChange={e => set("placeholder", e.target.value)} placeholder="e.g. az vm create …" />
          </label>
        </div>

        <div className="ap-section-label">Required tokens <span className="ap-hint-inline">(must appear in user's command)</span></div>
        {form.requiredTokens.map((token, i) => (
          <div key={i} className="ap-list-row">
            <input className="ap-input" value={token} onChange={e => setToken(i, e.target.value)} placeholder="e.g. --resource-group" />
            <button type="button" className="ap-remove-btn" onClick={() => removeToken(i)} disabled={form.requiredTokens.length <= 1}><CrossIcon /></button>
          </div>
        ))}
        <button type="button" className="ap-add-btn" onClick={addToken}>+ Add token</button>

        <label className="ap-label">
          Model answer
          <textarea className="ap-input ap-textarea ap-json" value={form.modelAnswer} onChange={e => set("modelAnswer", e.target.value)} rows={3} placeholder="Full correct command shown on wrong answer…" spellCheck={false} />
        </label>
        <label className="ap-label">
          Help text <span className="ap-optional">(shown via --help / Get-Help)</span>
          <textarea className="ap-input ap-textarea ap-json" value={form.helpText} onChange={e => set("helpText", e.target.value)} rows={4} placeholder="# az vm create&#10;Creates a virtual machine…" spellCheck={false} />
        </label>
        <label className="ap-label">
          Explanation
          <textarea className="ap-input ap-textarea" value={form.explanation} onChange={e => set("explanation", e.target.value)} rows={3} placeholder="Why is this the correct answer?" />
        </label>
      </>)}

      {/* ── Free toggle + submit ── */}
      <label className="ap-checkbox-row">
        <input type="checkbox" checked={form.is_free} onChange={e => set("is_free", e.target.checked)} />
        Free card (visible without premium)
      </label>

      {status && <p className={`ap-status ${status.ok ? "ok" : "err"}`}>{status.text}</p>}

      <button className="ap-submit" type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save card"}
      </button>
    </form>
  );
}

// ── Bulk import ───────────────────────────────────────────────────

function BulkImport() {
  const [json, setJson]       = useState("");
  const [preview, setPreview] = useState(null);
  const [status, setStatus]   = useState(null);
  const [saving, setSaving]   = useState(false);

  const handleParse = () => {
    setStatus(null);
    let parsed;
    try { parsed = JSON.parse(json); } catch { setPreview({ rows: [], errors: ["Invalid JSON — check your syntax."] }); return; }
    if (!Array.isArray(parsed)) { setPreview({ rows: [], errors: ["Expected a JSON array of card objects."] }); return; }
    const errors = [];
    const rows = parsed.map((item, idx) => {
      const errs = validateRow(item);
      if (errs.length) errors.push(`Row ${idx + 1} (${item.id ?? "no id"}): ${errs.join(", ")}`);
      return item;
    });
    setPreview({ rows, errors });
  };

  const handleImport = async () => {
    if (!preview || preview.errors.length) return;
    setSaving(true); setStatus(null);
    try {
      const upsert = supabase.from("cards").upsert(preview.rows, { onConflict: "id" });
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out — check your network or Supabase RLS policy")), 15_000)
      );
      const { error } = await Promise.race([upsert, timeout]);
      if (error) {
        setStatus({ ok: false, text: `Supabase error: ${error.message} (code: ${error.code})` });
        return;
      }
      setStatus({ ok: true, text: `${preview.rows.length} card${preview.rows.length !== 1 ? "s" : ""} imported.` });
      setJson(""); setPreview(null);
    } catch (err) {
      setStatus({ ok: false, text: `Error: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="ap-form">
      <p className="ap-hint ap-hint--top">
        Paste a JSON array. Top-level fields: <code>id, exam, category, type, difficulty, is_free, data</code>.
        For image-mcq/hotspot, store the SVG string in <code>data.diagram</code>.
      </p>
      <label className="ap-label">
        JSON
        <textarea
          className="ap-input ap-textarea ap-json"
          value={json}
          onChange={e => { setJson(e.target.value); setPreview(null); setStatus(null); }}
          rows={10}
          placeholder={'[\n  { "id": "AZ-900-101", "exam": "AZ-900", "category": "Cloud Concepts", "type": "mcq", "difficulty": "medium", "is_free": false, "data": { "question": "…", "choices": ["A","B","C","D"], "correctAnswer": 0, "answer": "…", "explanation": "…" } }\n]'}
          spellCheck={false}
        />
      </label>
      <button className="ap-submit ap-submit--secondary" type="button" onClick={handleParse} disabled={!json.trim()}>
        Parse &amp; preview
      </button>
      {preview && (
        <div className="ap-preview">
          {preview.errors.length > 0 ? (
            <div className="ap-errors">
              <strong>Validation errors</strong>
              <ul>{preview.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>
          ) : (<>
            <p className="ap-preview-count">{preview.rows.length} card{preview.rows.length !== 1 ? "s" : ""} ready to import.</p>
            <table className="ap-table">
              <thead><tr><th>ID</th><th>Exam</th><th>Category</th><th>Type</th><th>Difficulty</th><th>Free</th></tr></thead>
              <tbody>
                {preview.rows.map(r => (
                  <tr key={r.id}>
                    <td><code>{r.id}</code></td>
                    <td>{r.exam}</td>
                    <td>{r.category}</td>
                    <td>{r.type}{r.data?.taskType ? ` (${r.data.taskType})` : ""}</td>
                    <td>{r.difficulty}</td>
                    <td>{r.is_free ? <CheckIcon /> : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {status && <p className={`ap-status ${status.ok ? "ok" : "err"}`}>{status.text}</p>}
            <button className="ap-submit" type="button" onClick={handleImport} disabled={saving}>
              {saving ? "Importing…" : `Import ${preview.rows.length} card${preview.rows.length !== 1 ? "s" : ""}`}
            </button>
          </>)}
        </div>
      )}
      {status && !preview && <p className={`ap-status ${status.ok ? "ok" : "err"}`}>{status.text}</p>}
    </div>
  );
}

// ── Panel shell ───────────────────────────────────────────────────

export default function AdminPanel({ onClose }) {
  const [tab, setTab] = useState("single");
  return (
    <div className="ap-overlay" onClick={onClose}>
      <div className="ap-modal" onClick={e => e.stopPropagation()}>
        <button className="ap-close" onClick={onClose} aria-label="Close"><CrossIcon /></button>
        <h2 className="ap-title">Card Manager</h2>
        <div className="ap-tabs">
          <button className={`ap-tab${tab === "single" ? " active" : ""}`} onClick={() => setTab("single")}>New card</button>
          <button className={`ap-tab${tab === "bulk"   ? " active" : ""}`} onClick={() => setTab("bulk")}>Bulk import</button>
        </div>
        {tab === "single" ? <SingleCardForm /> : <BulkImport />}
      </div>
    </div>
  );
}
