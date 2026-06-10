import { useState } from 'react';
import BladeShell from '../BladeShell';
import { PublicIpIcon } from '../AzureIcons';

export default function PublicIpCreate({ region, onCreate, onClose }) {
  const [form, setForm] = useState({
    name: '',
    sku: 'Standard',
    tier: 'Regional',
    ipVersion: 'IPv4',
    availabilityZone: 'Zone-redundant',
    routingPreference: 'Microsoft network',
    idleTimeout: '4',
    allocation: 'Static',
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      // Standard SKU public IPs are always statically allocated
      if (field === 'sku' && value === 'Standard') next.allocation = 'Static';
      if (field === 'sku' && value === 'Basic') next.availabilityZone = 'No zone';
      return next;
    });
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
            <label className="psb-label">IP Version</label>
            <div className="psb-toggle-row">
              {['IPv4', 'IPv6'].map(v => (
                <label key={v} className="psb-toggle-option">
                  <input type="radio" name="pip-ipver" checked={form.ipVersion === v} onChange={() => update('ipVersion', v)} />
                  {v}
                </label>
              ))}
            </div>
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

          {form.sku === 'Standard' && (
            <div className="psb-field">
              <label className="psb-label">Tier</label>
              <div className="psb-toggle-row">
                {['Regional', 'Global'].map(t => (
                  <label key={t} className="psb-toggle-option">
                    <input type="radio" name="pip-tier" checked={form.tier === t} onChange={() => update('tier', t)} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="psb-field">
            <label className="psb-label">
              Availability zone
              <span className="psb-info-icon" title="Zone-redundant IPs are replicated across multiple availability zones">ⓘ</span>
            </label>
            <select
              className="psb-select"
              value={form.availabilityZone}
              onChange={e => update('availabilityZone', e.target.value)}
              disabled={form.sku === 'Basic'}
            >
              {form.sku === 'Basic' ? (
                <option>No zone</option>
              ) : (
                <>
                  <option>Zone-redundant</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>No zone</option>
                </>
              )}
            </select>
          </div>

          <div className="psb-field">
            <label className="psb-label">
              Routing preference
              <span className="psb-info-icon" title="Determines whether traffic is routed via the Microsoft global network or the public internet">ⓘ</span>
            </label>
            <div className="psb-toggle-row">
              {['Microsoft network', 'Internet'].map(r => (
                <label key={r} className="psb-toggle-option">
                  <input type="radio" name="pip-routing" checked={form.routingPreference === r} onChange={() => update('routingPreference', r)} />
                  {r}
                </label>
              ))}
            </div>
          </div>

          {form.sku === 'Basic' && (
            <div className="psb-field">
              <label className="psb-label">
                IP address assignment
                <span className="psb-info-icon" title="Static assigns a fixed IP that won't change; Dynamic is assigned at allocation time">ⓘ</span>
              </label>
              <div className="psb-toggle-row">
                {['Dynamic', 'Static'].map(a => (
                  <label key={a} className="psb-toggle-option">
                    <input type="radio" name="pip-alloc" checked={form.allocation === a} onChange={() => update('allocation', a)} />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="psb-field">
            <label className="psb-label">
              Idle timeout (minutes)
              <span className="psb-info-icon" title="The number of minutes a TCP or HTTP connection can remain idle before it's closed">ⓘ</span>
            </label>
            <input
              className="psb-input"
              value={form.idleTimeout}
              onChange={e => update('idleTimeout', e.target.value)}
              autoComplete="off"
              style={{ maxWidth: 120 }}
            />
          </div>
        </div>

      </div>
    </BladeShell>
  );
}
