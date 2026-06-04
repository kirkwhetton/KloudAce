export default function BladeShell({ title, subtitle, width = 350, icon, onClose, children, footer }) {
  return (
    <div className="ps-blade" style={{ minWidth: width, maxWidth: width }}>
      <div className="ps-blade-header">
        {icon && <span className="ps-blade-header-icon">{icon}</span>}
        <div className="ps-blade-header-text">
          <h2 className="ps-blade-title">{title}</h2>
          {subtitle && <p className="ps-blade-subtitle">{subtitle}</p>}
        </div>
        {onClose && (
          <button className="ps-blade-close" onClick={onClose} aria-label="Close blade">
            <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        )}
      </div>
      <div className="ps-blade-body">{children}</div>
      {footer && <div className="ps-blade-footer">{footer}</div>}
    </div>
  );
}
