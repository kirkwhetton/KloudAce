import { useState } from 'react';
import BladeShell from '../BladeShell';

export default function VNetSubnetAdd({ addressSpace, onSubnetAdd, onClose }) {
  const [form, setForm]   = useState({ name: '', range: '' });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Subnet name is required.';
    else if (!/^[a-zA-Z0-9][a-zA-Z0-9_.\-]*$/.test(form.name.trim()))
      errs.name = 'Name must start with a letter or number and contain only letters, numbers, underscores, periods, or hyphens.';
    if (!form.range.trim())
      errs.range = 'Subnet address range is required.';
    else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(form.range.trim()))
      errs.range = 'Enter a valid CIDR range (e.g. 10.1.1.0/24).';
    return errs;
  };

  const handleAdd = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubnetAdd({ name: form.name.trim(), range: form.range.trim() });
    onClose();
  };

  return (
    <BladeShell
      title="Add a subnet"
      subtitle={addressSpace ? `Address space: ${addressSpace}` : undefined}
      width={420}
      onClose={onClose}
      footer={
        <div className="psb-footer-actions">
          <button className="psb-btn psb-btn--primary" onClick={handleAdd}>Add</button>
          <button className="psb-btn psb-btn--ghost" onClick={onClose}>Cancel</button>
        </div>
      }
    >
      <div className="psb-form">

        <div className="psb-field">
          <label className="psb-label">
            Subnet purpose
            <span className="psb-info-icon" title="Select the intended use for this subnet">ⓘ</span>
          </label>
          <select className="psb-select" defaultValue="Default">
            <option>Default</option>
            <option>Azure Bastion</option>
            <option>Azure Firewall</option>
            <option>Azure Route Server</option>
            <option>Application Gateway</option>
          </select>
        </div>

        <div className="psb-field">
          <label className="psb-label">
            Name <span className="psb-required">*</span>
          </label>
          <input
            className={`psb-input${errors.name ? ' psb-input--error' : ''}`}
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="e.g. snet-workload"
            autoComplete="off"
          />
          {errors.name && <p className="psb-field-error">{errors.name}</p>}
        </div>

        <div className="psb-field">
          <label className="psb-label">
            Subnet address range <span className="psb-required">*</span>
            <span className="psb-info-icon" title="Must fall within the virtual network address space">ⓘ</span>
          </label>
          <input
            className={`psb-input${errors.range ? ' psb-input--error' : ''}`}
            value={form.range}
            onChange={e => update('range', e.target.value)}
            placeholder="e.g. 10.1.1.0/24"
            autoComplete="off"
          />
          {errors.range && <p className="psb-field-error">{errors.range}</p>}
        </div>

        <div className="psb-field-group">
          <p className="psb-field-group-title">Security</p>
          <div className="psb-field">
            <label className="psb-label">
              Network security group
              <span className="psb-info-icon" title="Filter inbound and outbound traffic">ⓘ</span>
            </label>
            <select className="psb-select"><option value="">None</option></select>
          </div>
          <div className="psb-field">
            <label className="psb-label">
              NAT gateway
              <span className="psb-info-icon" title="Provides outbound internet connectivity">ⓘ</span>
            </label>
            <select className="psb-select"><option value="">None</option></select>
          </div>
          <div className="psb-field">
            <label className="psb-label">Private endpoint network policies</label>
            <select className="psb-select"><option>Disabled</option><option>Enabled for route table</option><option>Enabled for NSG</option><option>Enabled for all</option></select>
          </div>
        </div>

        <div className="psb-field-group">
          <p className="psb-field-group-title">Services</p>
          <p className="psb-field-group-desc">Delegate a subnet to a specific service to allow it to create service-specific resources.</p>
          <div className="psb-field">
            <label className="psb-label">Subnet delegation</label>
            <select className="psb-select"><option value="">None</option></select>
          </div>
        </div>

      </div>
    </BladeShell>
  );
}
