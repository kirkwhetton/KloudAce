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

export function FlagIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

export function StarIcon({ className, size = 14, filled = false }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function TrophyIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0Z" />
      <path d="M17 5h2.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M7 5H4.5a2.5 2.5 0 0 0 0 5H7" />
    </svg>
  );
}

export function FireIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 22c4-2 6-5 6-8.5 0-2-1-3.5-2-4.5.2 1.5-.6 2.6-1.5 3 .5-2.5-.5-5.5-3-7 .5 2-.5 4-2 5.5C8 11.5 7 13 7 14.5c0 1 .2 2 .7 3" />
      <path d="M12 22a3.5 3.5 0 0 0 1-6.9c-.3 1.2-1 2-2 2.4-.3-1-1-1.7-1-2.5a3.5 3.5 0 0 0-1.7 3A3.5 3.5 0 0 0 12 22Z" />
    </svg>
  );
}

export function GraduationCapIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

export function AlarmClockIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3 3 5" />
      <path d="M19 3l2 2" />
      <path d="M9 1h6" />
    </svg>
  );
}

export function PartyIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3 21 7 9l11 4Z" />
      <path d="M14 4l1 2" />
      <path d="M18 3v2" />
      <path d="M21 7h-2" />
      <path d="M10 13l1.5 1.5" />
    </svg>
  );
}

export function CrownIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3 8 7 11l5-6 5 6 4-3-2 11H5L3 8Z" />
      <line x1="5" y1="20" x2="19" y2="20" />
    </svg>
  );
}

export function LockIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function EyeIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SunIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function MoonIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

export function WarningIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function TrashIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function PencilIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  );
}

export function FolderIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

export function CloudIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 5.5 5.5 0 0 0-10.9 1A4 4 0 0 0 6 19h11.5Z" />
    </svg>
  );
}

export function MapIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

export function ChevronRightIcon({ className, size = 14 }) {
  return (
    <svg {...base} width={size} height={size} className={className} aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
