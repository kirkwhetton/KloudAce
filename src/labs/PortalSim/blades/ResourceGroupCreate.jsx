import { useState } from 'react';
import BladeShell from '../BladeShell';

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
);

const SUBSCRIPTIONS = ['Pay-As-You-Go', 'Dev / Test', 'Production'];

const REGIONS = [
  'East US', 'East US 2', 'West US', 'West US 2', 'West US 3',
  'Central US', 'North Central US', 'South Central US', 'West Central US',
  'Canada Central', 'Canada East',
  'UK South', 'UK West',
  'West Europe', 'North Europe',
  'France Central', 'Germany West Central',
  'Southeast Asia', 'East Asia',
  'Australia East', 'Australia Southeast',
  'Japan East', 'Japan West',
  'Brazil South',
];

const TABS = ['Basics', 'Tags', 'Review + create'];
const TAB_IDS = ['basics', 'tags', 'review'];

export default function ResourceGroupCreate({ onClose, onSubmit, completed }) {
  const [tab, setTab]   = useState('basics');
  const [form, setForm] = useState({ subscription: 'Pay-As-You-Go', name: '', region: '' });
  const [tags, setTags] = useState([{ name: '', value: '' }]);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Resource group name is required.';
    else if (!/^[a-zA-Z0-9._\-()]+$/.test(form.name.trim()))
      errs.name = 'Name may only contain letters, numbers, periods, underscores, hyphens, and parentheses.';
    if (!form.region)
      errs.region = 'Region is required.';
    return errs;
  };

  const handleNext = () => {
    if (tab === 'basics') {
      const errs = validate();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setTab('tags');
    } else if (tab === 'tags') {
      setTab('review');
    } else {
      onSubmit({ name: form.name.trim(), region: form.region });
    }
  };

  const handlePrev = () => {
    if (tab === 'tags')   setTab('basics');
    if (tab === 'review') setTab('tags');
  };

  const tabIndex = TAB_IDS.indexOf(tab);

  return (
    <BladeShell
      title="Create a resource group"
      width={700}
      onClose={onClose}
      footer={
        <div className="psb-footer-actions">
          <button className="psb-btn" onClick={handlePrev} disabled={tab === 'basics'}>
            <ChevronLeftIcon /> Previous
          </button>
          <button
            className="psb-btn psb-btn--primary"
            onClick={handleNext}
            disabled={completed}
          >
            {tab === 'review' ? 'Create' : <span style={{display:'flex',alignItems:'center',gap:4}}>Next <ChevronRightIcon /></span>}
          </button>
          <button className="psb-btn psb-btn--ghost" onClick={onClose}>Cancel</button>
        </div>
      }
    >
      {/* Wizard tabs */}
      <div className="psb-wizard-tabs">
        {TABS.map((label, i) => (
          <div
            key={label}
            className={`psb-wizard-tab${i === tabIndex ? ' active' : ''}${i < tabIndex ? ' done' : ''}`}
            onClick={() => i < tabIndex && setTab(TAB_IDS[i])}
          >
            <span className="psb-wizard-tab-num">{i < tabIndex ? <CheckIcon /> : i + 1}</span>
            <span className="psb-wizard-tab-label">{label}</span>
            {i < TABS.length - 1 && <span className="psb-wizard-tab-sep">›</span>}
          </div>
        ))}
      </div>

      {/* ── Basics ── */}
      {tab === 'basics' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            A resource group is a container that holds related resources for an Azure solution. The resource group can include all the resources for the solution, or only those resources that you want to manage as a group.
          </p>

          <div className="psb-field-group">
            <p className="psb-field-group-title">Project details</p>
            <p className="psb-field-group-desc">Select a subscription to manage deployed resources and costs. Use resource groups like folders to organise and manage all your resources.</p>

            <div className="psb-field">
              <label className="psb-label">
                Subscription <span className="psb-required">*</span>
                <span className="psb-info-icon" title="The subscription that will be billed for this resource group.">ⓘ</span>
              </label>
              <select className="psb-select" value={form.subscription} onChange={e => update('subscription', e.target.value)}>
                {SUBSCRIPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="psb-field">
              <label className="psb-label">
                Resource group <span className="psb-required">*</span>
                <span className="psb-info-icon" title="A resource group is a container that holds related resources for an Azure solution.">ⓘ</span>
              </label>
              <input
                className={`psb-input${errors.name ? ' psb-input--error' : ''}`}
                value={form.name}
                onChange={e => update('name', e.target.value)}
                autoComplete="off"
              />
              {errors.name && <p className="psb-field-error">{errors.name}</p>}
            </div>
          </div>

          <div className="psb-field-group">
            <p className="psb-field-group-title">Resource details</p>

            <div className="psb-field">
              <label className="psb-label">
                Region <span className="psb-required">*</span>
                <span className="psb-info-icon" title="The location where the resource group metadata will be stored.">ⓘ</span>
              </label>
              <select
                className={`psb-select${errors.region ? ' psb-input--error' : ''}`}
                value={form.region}
                onChange={e => update('region', e.target.value)}
              >
                <option value="">Select a region</option>
                {REGIONS.map(r => <option key={r}>{r}</option>)}
              </select>
              {errors.region && <p className="psb-field-error">{errors.region}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── Tags ── */}
      {tab === 'tags' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            Tags are name/value pairs that enable you to categorise resources and view consolidated billing by applying the same tag to multiple resources and resource groups.
          </p>
          <div className="psb-tags">
            <div className="psb-tags-header">
              <span>Name</span>
              <span>Value</span>
              <span>Resource</span>
            </div>
            {tags.map((tag, i) => (
              <div key={i} className="psb-tags-row">
                <input className="psb-input" placeholder="Name" value={tag.name}
                  onChange={e => setTags(prev => prev.map((t, j) => j === i ? { ...t, name: e.target.value } : t))} />
                <input className="psb-input" placeholder="Value" value={tag.value}
                  onChange={e => setTags(prev => prev.map((t, j) => j === i ? { ...t, value: e.target.value } : t))} />
                <span className="psb-text-muted">All selected resources</span>
              </div>
            ))}
            <button className="psb-link psb-link--sm" onClick={() => setTags(prev => [...prev, { name: '', value: '' }])}>
              + Add tag
            </button>
          </div>
        </div>
      )}

      {/* ── Review + create ── */}
      {tab === 'review' && (
        <div className="psb-form">
          <div className="psb-validation-banner psb-validation-banner--ok">
            <span className="psb-validation-icon"><CheckIcon /></span>
            Validation passed
          </div>

          <p className="psb-section-desc">Review the settings for your resource group. Select Create to deploy it.</p>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Basics</p>
            <table className="psb-review-table">
              <tbody>
                <tr><td>Subscription</td><td>{form.subscription}</td></tr>
                <tr><td>Resource group</td><td><strong>{form.name}</strong></td></tr>
                <tr><td>Region</td><td>{form.region}</td></tr>
              </tbody>
            </table>
          </div>

          {tags.some(t => t.name) && (
            <div className="psb-review-section">
              <p className="psb-review-section-title">Tags</p>
              <table className="psb-review-table">
                <tbody>
                  {tags.filter(t => t.name).map((t, i) => (
                    <tr key={i}><td>{t.name}</td><td>{t.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </BladeShell>
  );
}
