import "./ConfirmDialog.css";

/**
 * A native-feeling confirm dialog rendered as a site element.
 *
 * Props:
 *   title      — bold heading
 *   message    — body text (string or JSX)
 *   confirmLabel — label for the destructive button (default "Confirm")
 *   cancelLabel  — label for the cancel button (default "Cancel")
 *   onConfirm  — called when the user clicks the confirm button
 *   onCancel   — called when the user clicks cancel or the backdrop
 */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="cdialog-overlay" onClick={onCancel}>
      <div className="cdialog" role="alertdialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="cdialog-icon">⚠️</div>
        {title && <h3 className="cdialog-title">{title}</h3>}
        {message && <p className="cdialog-message">{message}</p>}
        <div className="cdialog-actions">
          <button className="cdialog-btn cancel" onClick={onCancel}>{cancelLabel}</button>
          <button className="cdialog-btn confirm" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
