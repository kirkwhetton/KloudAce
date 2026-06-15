// Shared inline SVG icons, styled to match the rest of the app
// (viewBox 0 0 24 24, stroke-based, currentColor). Used in place of emojis
// per RULES.md Rule 1.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function CheckIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CrossIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function BookIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}

export function RefreshIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function LightbulbIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a6 6 0 0 0-4 10.5c.5.5.8 1.1.9 1.8L9 16h6l.1-1.7c.1-.7.4-1.3.9-1.8A6 6 0 0 0 12 2Z" />
    </svg>
  );
}

export function EyeOffIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c5 0 9 4 10 8a13.7 13.7 0 0 1-1.67 3.13" />
      <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12c1 4 5 8 10 8a9.3 9.3 0 0 0 4.39-1.11" />
      <path d="M2 2l20 20" />
      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
    </svg>
  );
}

export function SettingsIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function NeutralFaceIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15h8" />
      <path d="M8 9h.01" />
      <path d="M16 9h.01" />
    </svg>
  );
}

export function WrenchIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.66 5.66L3 18v3h3l6.04-6.04a4 4 0 0 0 5.66-5.66l-2.5-2.5-3 3Z" />
    </svg>
  );
}

export function HashIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M10 3 8 21" />
      <path d="M16 3l-2 18" />
    </svg>
  );
}

export function LinkIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5" />
    </svg>
  );
}

export function SearchIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function TerminalIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="m4 17 6-5-6-5" />
      <path d="M12 19h8" />
    </svg>
  );
}

export function KeyboardIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M6 9h.01" />
      <path d="M10 9h.01" />
      <path d="M14 9h.01" />
      <path d="M18 9h.01" />
      <path d="M6 13h.01" />
      <path d="M10 13h.01" />
      <path d="M14 13h.01" />
      <path d="M18 13h.01" />
      <path d="M8 17h8" />
    </svg>
  );
}

export function PlayIcon({ className, size = 14 }) {
  return (
    <svg {...base} fill="currentColor" stroke="none" width={size} height={size} className={className} aria-hidden="true" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
