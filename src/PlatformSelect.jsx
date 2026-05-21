import "./PlatformSelect.css";

const PLATFORMS = [
  {
    id: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    tagline: "Explore Azure certifications",
    live: true,
    icon: <img src="/azure-logo.svg" alt="Microsoft Azure" className="platform-logo-img" />,
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    shortName: "AWS",
    tagline: "",
    live: false,
    icon: <img src="/aws-logo.svg" alt="Amazon Web Services" className="platform-logo-img" />,
  },
  {
    id: "gcp",
    name: "Google Cloud",
    shortName: "GCP",
    tagline: "",
    live: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1 36 31" className="platform-logo-img" aria-label="Google Cloud" role="img">
        <path fill="#ea4335" d="M21.85,7.41l1,0,2.85-2.85.14-1.21A12.81,12.81,0,0,0,5,9.6a1.55,1.55,0,0,1,1-.06l5.7-.94s.29-.48.44-.45a7.11,7.11,0,0,1,9.73-.74Z"/>
        <path fill="#4285f4" d="M29.76,9.6a12.84,12.84,0,0,0-3.87-6.24l-4,4A7.11,7.11,0,0,1,24.5,13v.71a3.56,3.56,0,1,1,0,7.12H17.38l-.71.72v4.27l.71.71H24.5A9.26,9.26,0,0,0,29.76,9.6Z"/>
        <path fill="#34a853" d="M10.25,26.49h7.12v-5.7H10.25a3.54,3.54,0,0,1-1.47-.32l-1,.31L4.91,23.63l-.25,1A9.21,9.21,0,0,0,10.25,26.49Z"/>
        <path fill="#fbbc05" d="M10.25,8A9.26,9.26,0,0,0,4.66,24.6l4.13-4.13a3.56,3.56,0,1,1,4.71-4.71l4.13-4.13A9.25,9.25,0,0,0,10.25,8Z"/>
      </svg>
    ),
  },
];

export default function PlatformSelect({ user, onSelect, onLogout }) {
  return (
    <div className="platform-page">
      <main className="platform-main">
        <div className="platform-card-box">

        {/* Hero logo */}
        <div className="platform-hero-logo">
          <svg className="platform-hero-cloud" viewBox="0 0 260 165" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <path id="heroCloud" d="M50 115C30 115 15 100 15 82C15 66 27 53 43 51C45 30 63 14 85 14C102 14 117 24 124 39C129 36 135 34 141 34C159 34 174 49 174 67C188 69 199 81 199 95C199 106 191 115 180 115Z"/>
            </defs>
            <use href="#heroCloud" x="20" y="27" fill="#185FA5"/>
            <use href="#heroCloud" x="40" y="47" fill="#ffffff" stroke="#2980D9" strokeWidth="5"/>
          </svg>
          <div className="platform-hero-text">
            <span className="platform-hero-brand">Kloud<span className="title-ace">Ace</span></span>
          </div>
        </div>

        <div className="platform-intro">
          <h1 className="platform-title">Choose your cloud provider</h1>
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
              <div className="platform-card-icon">{p.icon}</div>
              <div className="platform-card-body">
                <span className="platform-card-name">{p.name}</span>
                {p.tagline && <span className="platform-card-tagline">{p.tagline}</span>}
              </div>
              {!p.live && <span className="platform-soon-badge">Coming Soon</span>}
              {p.live && (
                <svg className="platform-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>
          ))}
        </div>

        <div className="platform-user-block">
          <p className="platform-user-hint">Signed in as <strong>{user?.name || user?.email}</strong></p>
          <button className="platform-signout" onClick={onLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </div>

        </div>{/* end platform-card-box */}
      </main>

      <footer className="platform-footer">
        Microsoft Azure, Amazon Web Services, and Google Cloud are trademarks of their respective owners. KloudAce is not affiliated with or endorsed by Microsoft, Amazon, or Google.
      </footer>
    </div>
  );
}
