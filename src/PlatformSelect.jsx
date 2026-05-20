import "./PlatformSelect.css";

const PLATFORMS = [
  {
    id: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    tagline: "Explore Azure certifications",
    live: true,
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="platform-icon">
        <path d="M44 12L20 68h16l6-14h24L44 12z" fill="currentColor" opacity="0.9"/>
        <path d="M36 20L16 68h12l26-48H36z" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    shortName: "AWS",
    tagline: "Coming soon",
    live: false,
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="platform-icon">
        <path d="M14 50c0 0 12 8 26 8s26-8 26-8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M14 50l-4 6 4-6zM66 50l4 6-4-6z" fill="currentColor"/>
        <rect x="20" y="22" width="12" height="18" rx="2" fill="currentColor" opacity="0.8"/>
        <rect x="34" y="18" width="12" height="22" rx="2" fill="currentColor" opacity="0.9"/>
        <rect x="48" y="26" width="12" height="14" rx="2" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: "gcp",
    name: "Google Cloud",
    shortName: "GCP",
    tagline: "Coming soon",
    live: false,
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="platform-icon">
        <path d="M55 30H50.5C48.5 22 41.5 16 33 16C22.5 16 14 24.5 14 35C14 45.5 22.5 54 33 54H55C62.3 54 68 48.3 68 41C68 33.7 62.3 28 55 28V30Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="33" y1="62" x2="33" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="44" y1="62" x2="44" y2="72" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="22" y1="62" x2="22" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function PlatformSelect({ user, onSelect, onLogout }) {
  return (
    <div className="platform-page">
      <header className="platform-header">
        <div className="platform-header-logo">
          <svg className="platform-header-cloud" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <path id="phCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
            </defs>
            <use href="#phCloud" x="20" y="27" fill="#185FA5"/>
            <use href="#phCloud" x="40" y="47" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
          </svg>
          <div className="platform-header-text">
            <span className="platform-header-brand">Kloud<span className="title-ace">Ace</span></span>
          </div>
        </div>
        <button className="platform-signout" onClick={onLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>
      </header>

      <main className="platform-main">
        <div className="platform-intro">
          <h1 className="platform-title">Choose your cloud</h1>
          <p className="platform-subtitle">Select a platform to start learning</p>
        </div>

        <div className="platform-grid">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              className={`platform-card platform-card--${p.id}${p.live ? "" : " platform-card--soon"}`}
              onClick={() => p.live && onSelect(p.id)}
              disabled={!p.live}
              aria-label={p.live ? `Select ${p.name}` : `${p.name} — coming soon`}
            >
              {!p.live && <span className="platform-soon-badge">Coming Soon</span>}
              <div className="platform-card-icon">{p.icon}</div>
              <div className="platform-card-body">
                <span className="platform-card-name">{p.name}</span>
                <span className="platform-card-tagline">{p.tagline}</span>
              </div>
              {p.live && (
                <svg className="platform-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        <p className="platform-user-hint">Signed in as <strong>{user?.name || user?.email}</strong></p>
      </main>
    </div>
  );
}
