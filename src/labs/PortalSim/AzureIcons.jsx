// Azure-portal-style service icons, recreated in-house (not Microsoft's
// official icon assets) to echo the shapes and colours used for each
// service in the real Azure portal — e.g. the green diamond for Load
// Balancer, the blue square grid for Resource groups, etc.

const wrap = (size, children) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">{children}</svg>
);

export const HomeIcon = ({ size = 18 }) => wrap(size, (
  <path fill="#0078D4" d="M12 2.5 2 11h3v9h5v-6h4v6h5v-9h3z" />
));

export const ResourceGroupIcon = ({ size = 18 }) => wrap(size, (
  <>
    <rect x="2" y="2" width="9" height="9" rx="1" fill="#0078D4" />
    <rect x="13" y="2" width="9" height="9" rx="1" fill="#50E6FF" />
    <rect x="2" y="13" width="9" height="9" rx="1" fill="#50E6FF" />
    <rect x="13" y="13" width="9" height="9" rx="1" fill="#0078D4" />
  </>
));

export const VirtualNetworkIcon = ({ size = 18 }) => wrap(size, (
  <>
    <path d="M12 2 3 7v10l9 5 9-5V7z" fill="#5C2D91" />
    <circle cx="12" cy="9" r="2.4" fill="#fff" />
    <circle cx="7" cy="15" r="2" fill="#fff" />
    <circle cx="17" cy="15" r="2" fill="#fff" />
    <path d="M10.3 10.5 8.3 13.4M13.7 10.5l2 2.9" stroke="#fff" strokeWidth="1" />
  </>
));

// Load Balancer — green diamond/rhombus, matching the real Azure icon family
export const LoadBalancerIcon = ({ size = 18 }) => wrap(size, (
  <>
    <path d="M12 1 23 12 12 23 1 12z" fill="#3FB950" />
    <path d="M7 12h2.2M14.8 12H17M12 7v2.2M12 14.8V17" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2.1" fill="#fff" />
  </>
));

export const TrafficManagerIcon = ({ size = 18 }) => wrap(size, (
  <>
    <circle cx="12" cy="12" r="10" fill="#0078D4" />
    <path d="M16 8l-3 5-5 3 3-5z" fill="#fff" />
  </>
));

export const PublicIpIcon = ({ size = 18 }) => wrap(size, (
  <>
    <path d="M12 1 23 12 12 23 1 12z" fill="#3A9BDC" />
    <path d="M12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 1.3c.6.6 1 1.6 1.2 2.7H10.8c.2-1.1.6-2.1 1.2-2.7zM9.4 9.5c-.5 0-.9.7-1.1 1.6h1.7c.05-.6.15-1.1.27-1.6h-.86zm5.2 0h-.86c.12.5.22 1 .27 1.6h1.7c-.2-.9-.6-1.6-1.11-1.6zM8.2 12.1c0 .55.06 1.1.16 1.6h1.62c-.05-.5-.08-1.05-.08-1.6s.03-1.1.08-1.6H8.36c-.1.5-.16 1.05-.16 1.6zm7.46-1.6c.05.5.08 1.05.08 1.6s-.03 1.1-.08 1.6h1.62c.1-.5.16-1.05.16-1.6s-.06-1.1-.16-1.6zM10.8 14.5c.2 1.1.6 2.1 1.2 2.7.6-.6 1-1.6 1.2-2.7zM9.4 14.5c.2.9.61 1.6 1.12 1.6h.86a8.7 8.7 0 01-.27-1.6zm5.06 0a8.7 8.7 0 01-.27 1.6h.86c.51 0 .92-.7 1.12-1.6z" fill="#fff" />
  </>
));

export const CostManagementIcon = ({ size = 18 }) => wrap(size, (
  <>
    <circle cx="12" cy="12" r="10" fill="#FFB900" />
    <path d="M12 6v1.2M12 16.8V18M14.5 8.5c0-1-1-1.7-2.5-1.7s-2.5.8-2.5 1.8c0 1.1 1 1.5 2.5 1.9s2.5.8 2.5 1.9c0 1-1 1.8-2.5 1.8s-2.5-.7-2.5-1.7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none" />
  </>
));

export const MonitorIcon = ({ size = 18 }) => wrap(size, (
  <>
    <rect x="2" y="3" width="20" height="13" rx="1.5" fill="#0078D4" />
    <path d="M5 13l3-4 2.5 3L14 7l5 6" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="18" width="6" height="2" rx="1" fill="#0078D4" />
  </>
));

export const SettingsIcon = ({ size = 18 }) => wrap(size, (
  <>
    <circle cx="12" cy="12" r="9" fill="#737373" />
    <circle cx="12" cy="12" r="3" fill="#fff" />
    <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 4.5v2M12 17.5v2M19.5 12h-2M6.5 12h-2M17.4 6.6l-1.4 1.4M8 16l-1.4 1.4M17.4 17.4L16 16M8 8L6.6 6.6" />
    </g>
  </>
));
