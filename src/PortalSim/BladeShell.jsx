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
          <button className="ps-blade-close" onClick={onClose} aria-label="Close blade">✕</button>
        )}
      </div>
      <div className="ps-blade-body">{children}</div>
      {footer && <div className="ps-blade-footer">{footer}</div>}
    </div>
  );
}
