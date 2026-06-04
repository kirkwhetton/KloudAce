import { useState, useCallback, useEffect, useRef } from 'react';
import './PortalSim.css';
import ResourceGroupList   from './blades/ResourceGroupList';
import ResourceGroupCreate from './blades/ResourceGroupCreate';
import VNetList            from './blades/VNetList';
import VNetCreate          from './blades/VNetCreate';
import VNetSubnetAdd       from './blades/VNetSubnetAdd';
import TmProfile           from './blades/TmProfile';

const BLADE_REGISTRY = {
  'rg-list':         ResourceGroupList,
  'rg-create':       ResourceGroupCreate,
  'vnet-list':       VNetList,
  'vnet-create':     VNetCreate,
  'vnet-subnet-add': VNetSubnetAdd,
  'tm-profile':      TmProfile,
};

// Which nav item lights up for each initial blade
const BLADE_NAV_MAP = {
  'rg-list':    'rg',
  'vnet-list':  'network',
  'tm-profile': 'tm',
};

const NAV_ITEMS = [
  {
    id: 'home', label: 'Home',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
      </svg>
    ),
  },
  {
    id: 'rg', label: 'Resource groups',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
      </svg>
    ),
  },
  {
    id: 'network', label: 'Virtual networks',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
      </svg>
    ),
  },
  {
    id: 'tm', label: 'Traffic Manager',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    id: 'costs', label: 'Cost Management + Billing',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    id: 'monitor', label: 'Monitor',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    id: 'settings', label: 'Settings',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
      </svg>
    ),
  },
];

// Parses **bold** and `code` within step text
function renderStep(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="psim-step-code">{part.slice(1, -1)}</code>;
    return part;
  });
}

export default function PortalSim({ card, onKnow, onSrsRate }) {
  const initialBlade = card.initialBlade ?? 'rg-list';
  const activeNav    = BLADE_NAV_MAP[initialBlade] ?? 'rg';

  const [blades,    setBlades]    = useState([{ id: initialBlade, props: {} }]);
  const [completed, setCompleted] = useState(false);
  const [result,    setResult]    = useState(null);
  const [hintsUsed, setHintsUsed] = useState(false);
  const [showHint,  setShowHint]  = useState(false);
  const bladeAreaRef = useRef(null);

  useEffect(() => {
    if (bladeAreaRef.current) {
      bladeAreaRef.current.scrollTo?.({ left: bladeAreaRef.current.scrollWidth, behavior: 'smooth' });
    }
  }, [blades.length]);

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

      {/* ── Left: Azure portal shell ───────────────────────── */}
      <div className="psim-portal">

        <header className="psim-topbar">
          <div className="psim-topbar-left">
            <button className="psim-hamburger" aria-label="Menu">
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
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
            <button className="psim-topbar-icon" title="Cloud Shell" aria-label="Cloud Shell">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </button>
            <button className="psim-topbar-icon" title="Notifications" aria-label="Notifications">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
            </button>
            <button className="psim-topbar-icon" title="Settings" aria-label="Settings">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
            </button>
            <div className="psim-topbar-user">
              <div className="psim-user-avatar">K</div>
            </div>
          </div>
        </header>

        {completed && (
          <div className={`psim-notification psim-notification--${result}`}>
            <span className="psim-notification-icon">
              {result === 'correct' ? (
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
              )}
            </span>
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
                Next
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true" style={{ marginLeft: '0.2rem' }}>
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="psim-body">
          <nav className="psim-leftnav" aria-label="Portal navigation">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`psim-nav-item${item.id === activeNav ? ' active' : ''}`}
                title={item.label}
                aria-label={item.label}
              >
                <span className="psim-nav-icon" aria-hidden="true">{item.icon}</span>
              </button>
            ))}
          </nav>

          <div className="psim-blade-area" ref={bladeAreaRef}>
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

      {/* ── Right: lab instructions panel ──────────────────── */}
      <aside className="psim-instructions" aria-label="Lab instructions">
        <div className="psim-instructions-header">
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
          </svg>
          Lab Guide
          {completed && (
            <span className={`psim-instructions-status psim-instructions-status--${result}`}>
              {result === 'correct' ? '✓' : '✗'}
            </span>
          )}
        </div>

        <div className="psim-instructions-body">

          {card.guide ? (
            <>
              <p className="psim-lab-title">{card.task}</p>

              {card.guide.map((section, i) => (
                <div key={i} className="psim-guide-section">
                  <div className="psim-guide-section-title">
                    <span className="psim-guide-task-num">{i + 1}</span>
                    {section.title}
                  </div>
                  <ol className="psim-guide-steps">
                    {section.steps.map((step, j) => (
                      <li key={j} className="psim-guide-step">
                        {renderStep(step)}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="psim-instructions-label">Task</p>
              <p className="psim-simple-task">{card.task}</p>
            </>
          )}

          {card.hint && (
            <div className="psim-hint-section">
              <button
                className="psim-hint-toggle"
                onClick={() => { setShowHint(v => !v); setHintsUsed(true); }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              {showHint && <p className="psim-hint-body">{card.hint}</p>}
            </div>
          )}

        </div>
      </aside>

    </div>
  );
}
