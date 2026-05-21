import { TbBrandAzure, TbBrandAws, TbBrandGoogle } from "react-icons/tb";
import "./PlatformSelect.css";

const PLATFORMS = [
  {
    id: "azure",
    name: "Microsoft Azure",
    shortName: "Azure",
    tagline: "Explore Azure certifications",
    live: true,
    icon: <TbBrandAzure className="platform-icon" aria-hidden="true" />,
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    shortName: "AWS",
    tagline: "Coming soon",
    live: false,
    icon: <TbBrandAws className="platform-icon" aria-hidden="true" />,
  },
  {
    id: "gcp",
    name: "Google Cloud",
    shortName: "GCP",
    tagline: "Coming soon",
    live: false,
    icon: <TbBrandGoogle className="platform-icon" aria-hidden="true" />,
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

      <footer className="platform-footer">
        Microsoft Azure, Amazon Web Services, and Google Cloud are trademarks of their respective owners. KloudAce is not affiliated with or endorsed by Microsoft, Amazon, or Google.
      </footer>
    </div>
  );
}
