import { useState, useCallback } from 'react';
import './PortalSim.css';
import ResourceGroupList   from './blades/ResourceGroupList';
import ResourceGroupCreate from './blades/ResourceGroupCreate';

const BLADE_REGISTRY = {
  'rg-list':   ResourceGroupList,
  'rg-create': ResourceGroupCreate,
};

// Left nav items — only the ones relevant to AZ-900 scope for now
const NAV_ITEMS = [
  { id: 'home',     icon: '⊞', label: 'Home' },
  { id: 'rg',       icon: '▦', label: 'Resource groups' },
  { id: 'costs',    icon: '💰', label: 'Cost Management + Billing' },
  { id: 'monitor',  icon: '📈', label: 'Monitor' },
  { id: 'settings', icon: '⚙', label: 'Settings' },
];

export default function PortalSim({ card, onKnow, onSrsRate }) {
  const initialBlade = card.initialBlade ?? 'rg-list';

  const [blades,    setBlades]    = useState([{ id: initialBlade, props: {} }]);
  const [completed, setCompleted] = useState(false);
  const [result,    setResult]    = useState(null); // 'correct' | 'incorrect'
  const [hintsUsed, setHintsUsed] = useState(false);
  const [showHint,  setShowHint]  = useState(false);

  const openBlade = useCallback((id, props = {}) => {
    setBlades(prev => [...prev, { id, props }]);
  }, []);

  const closeBlade = useCallback((index) => {
    setBlades(prev => prev.slice(0, index));
  }, []);

  const checkSolution = useCallback((formData) => {
    const sol = card.solution ?? {};
    const isCorrect = Object.keys(sol).every(key => {
      const expected = String(sol[key]).toLowerCase().trim();
      const actual   = String(formData[key] ?? '').toLowerCase().trim();
      return expected === actual;
    });
    setResult(isCorrect ? 'correct' : 'incorrect');
    setCompleted(true);
  }, [card.solution]);

  const handleRetry = () => {
    setBlades([{ id: initialBlade, props: {} }]);
    setCompleted(false);
    setResult(null);
  };

  const handleNext = () => {
    const score = result === 'correct' ? (hintsUsed ? 3 : 4) : 1;
    onSrsRate ? onSrsRate(score) : onKnow?.();
  };

  return (
    <div className="psim-root">
      {/* Task banner */}
      <div className="psim-task">
        <div className="psim-task-inner">
          <div className="psim-task-label-row">
            <span className="psim-task-label">Task</span>
            {card.hint && !showHint && (
              <button className="psim-hint-btn" onClick={() => { setShowHint(true); setHintsUsed(true); }}>
                💡 Hint
              </button>
            )}
          </div>
          <p className="psim-task-text">{card.task}</p>
          {showHint && <p className="psim-hint-text">💡 {card.hint}</p>}
        </div>
      </div>

      {/* Azure portal shell */}
      <div className="psim-shell">

        {/* Top navigation bar */}
        <header className="psim-topbar">
          <div className="psim-topbar-left">
            <button className="psim-hamburger" aria-label="Menu">☰</button>
            <div className="psim-topbar-logo">
              <svg viewBox="0 0 24 24" fill="none" className="psim-azure-icon" aria-hidden="true">
                <path d="M13.5 3L5 19h5l1.5-3h6L19 19h5L13.5 3z" fill="white" fillOpacity="0.9"/>
              </svg>
              <span className="psim-topbar-brand">Microsoft Azure</span>
            </div>
          </div>

          <div className="psim-topbar-search">
            <svg viewBox="0 0 16 16" fill="currentColor" className="psim-search-icon" aria-hidden="true">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.868-3.833zm-5.242 1.406a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
            <input className="psim-search-input" placeholder="Search resources, services, and docs (G+/)" readOnly />
          </div>

          <div className="psim-topbar-right">
            <button className="psim-topbar-icon" title="Cloud Shell" aria-label="Cloud Shell">⌘</button>
            <button className="psim-topbar-icon" title="Notifications" aria-label="Notifications">🔔</button>
            <button className="psim-topbar-icon" title="Settings" aria-label="Settings">⚙</button>
            <div className="psim-topbar-user">
              <div className="psim-user-avatar">K</div>
            </div>
          </div>
        </header>

        {/* In-portal notification bar — appears when task is submitted */}
        {completed && (
          <div className={`psim-notification psim-notification--${result}`}>
            <span className="psim-notification-icon">{result === 'correct' ? '✓' : '✗'}</span>
            <span className="psim-notification-msg">
              {result === 'correct'
                ? `Deployment succeeded${hintsUsed ? ' (hint used)' : ''}.`
                : 'Deployment failed — configuration does not match the task requirements.'}
            </span>
            <div className="psim-notification-actions">
              {result === 'incorrect' && (
                <button className="psim-notification-btn" onClick={handleRetry}>↺ Retry</button>
              )}
              <button className="psim-notification-btn psim-notification-btn--primary" onClick={handleNext}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Body: left nav + blade area */}
        <div className="psim-body">
          <nav className="psim-leftnav" aria-label="Portal navigation">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`psim-nav-item${item.id === 'rg' ? ' active' : ''}`}
                title={item.label}
                aria-label={item.label}
              >
                <span className="psim-nav-icon" aria-hidden="true">{item.icon}</span>
              </button>
            ))}
          </nav>

          {/* Blade stack — scrolls horizontally */}
          <div className="psim-blade-area">
            {blades.map((blade, i) => {
              const Blade = BLADE_REGISTRY[blade.id];
              if (!Blade) return null;
              return (
                <Blade
                  key={`${blade.id}-${i}`}
                  {...blade.props}
                  onOpen={openBlade}
                  onClose={() => closeBlade(i)}
                  onSubmit={checkSolution}
                  completed={completed}
                  isLast={i === blades.length - 1}
                />
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
