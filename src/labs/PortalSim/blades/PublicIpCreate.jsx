import { useState } from 'react';
import BladeShell from '../BladeShell';
import { PublicIpIcon } from '../AzureIcons';

export default function PublicIpCreate({ region, onCreate, onClose }) {
  const [form, setForm] = useState({
    name: '',
    sku: 'Standard',
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCreate = () => {
    if (!form.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Public IP address name is required.' }));
      return;
    }
    onCreate({ ...form, name: form.name.trim() });
    onClose();
  };

  return (
    <BladeShell
      title="Create public IP address"
      subtitle={region}
      icon={<PublicIpIcon size={22} />}
      width={460}
      onClose={onClose}
      footer={
        <div className="psb-footer-actions">
          <button className="psb-btn psb-btn--primary" onClick={handleCreate}>OK</button>
          <button className="psb-btn psb-btn--ghost" onClick={onClose}>Cancel</button>
        </div>
      }
    >
      <div className="psb-form">

        <div className="psb-field-group">
          <p className="psb-field-group-title">Project details</p>
          <div className="psb-field">
            <label className="psb-label">
              Region
              <span className="psb-info-icon" title="Public IP addresses are regional resources">ⓘ</span>
            </label>
            <input className="psb-input" value={region ?? ''} disabled />
          </div>
        </div>

        <div className="psb-field-group">
          <p className="psb-field-group-title">Instance details</p>

          <div className="psb-field">
            <label className="psb-label">Name <span className="psb-required">*</span></label>
            <input
              className={`psb-input${errors.name ? ' psb-input--error' : ''}`}
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="e.g. pip-web-prod"
              autoComplete="off"
            />
            {errors.name && <p className="psb-field-error">{errors.name}</p>}
          </div>

          <div className="psb-field">
            <label className="psb-label">
              SKU
              <span className="psb-info-icon" title="Standard SKU public IPs are recommended for production workloads and required for Standard load balancers">ⓘ</span>
            </label>
            <div className="psb-toggle-row">
              {['Basic', 'Standard'].map(s => (
                <label key={s} className="psb-toggle-option">
                  <input type="radio" name="pip-sku" checked={form.sku === s} onChange={() => update('sku', s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>

      </div>
    </BladeShell>
  );
}
