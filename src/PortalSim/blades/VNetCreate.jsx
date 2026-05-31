import { useState } from 'react';
import BladeShell from '../BladeShell';

const SUBSCRIPTIONS  = ['Pay-As-You-Go', 'Dev / Test', 'Production'];
const RESOURCE_GROUPS = ['rg-networking', 'rg-workloads-dev', 'rg-workloads-prod', 'rg-management'];
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

const TABS    = ['Basics', 'Security', 'Address space', 'Tags', 'Review + create'];
const TAB_IDS = ['basics', 'security', 'ip', 'tags', 'review'];

const TrashIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
  </svg>
);

export default function VNetCreate({ onOpen, onClose, onSubmit, completed }) {
  const [tab,    setTab]    = useState('basics');
  const [form,   setForm]   = useState({ subscription: 'Pay-As-You-Go', resourceGroup: 'rg-networking', name: '', region: '' });
  const [addressSpace, setAddressSpace] = useState('10.0.0.0/16');
  const [subnets, setSubnets] = useState([]);
  const [tags,   setTags]   = useState([{ name: '', value: '' }]);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateBasics = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Virtual network name is required.';
    else if (!/^[a-zA-Z0-9][a-zA-Z0-9_.\-]*$/.test(form.name.trim()))
      errs.name = 'Name must start with a letter or number and contain only letters, numbers, hyphens, underscores, or periods.';
    if (!form.region)
      errs.region = 'Region is required.';
    return errs;
  };

  const validateIp = () => {
    const errs = {};
    if (!addressSpace.trim())
      errs.addressSpace = 'IPv4 address space is required.';
    else if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/.test(addressSpace.trim()))
      errs.addressSpace = 'Enter a valid CIDR block (e.g. 10.1.0.0/16).';
    return errs;
  };

  const handleNext = () => {
    if (tab === 'basics') {
      const errs = validateBasics();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setTab('security');
    } else if (tab === 'security') {
      setTab('ip');
    } else if (tab === 'ip') {
      const errs = validateIp();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setTab('tags');
    } else if (tab === 'tags') {
      setTab('review');
    } else {
      const [sn] = subnets;
      onSubmit({
        name:         form.name.trim(),
        region:       form.region,
        addressSpace: addressSpace.trim(),
        subnetName:   sn?.name  ?? '',
        subnetRange:  sn?.range ?? '',
      });
    }
  };

  const handlePrev = () => {
    if (tab === 'security') setTab('basics');
    if (tab === 'ip')       setTab('security');
    if (tab === 'tags')     setTab('ip');
    if (tab === 'review')   setTab('tags');
  };

  const handleAddSubnet = () => {
    onOpen('vnet-subnet-add', {
      addressSpace,
      onSubnetAdd: (subnet) => setSubnets(prev => [...prev, subnet]),
    });
  };

  const handleDeleteSubnet = (name) => {
    setSubnets(prev => prev.filter(s => s.name !== name));
  };

  const tabIndex = TAB_IDS.indexOf(tab);
  const canCreate = form.name && form.region && addressSpace;

  return (
    <BladeShell
      title="Create virtual network"
      width={700}
      onClose={onClose}
      footer={
        <div className="psb-footer-actions">
          <button className="psb-btn" onClick={handlePrev} disabled={tab === 'basics'}>← Previous</button>
          <button
            className="psb-btn psb-btn--primary"
            onClick={handleNext}
            disabled={completed || (tab === 'review' && !canCreate)}
          >
            {tab === 'review' ? 'Create' : 'Next →'}
          </button>
          <button className="psb-btn psb-btn--ghost" onClick={onClose}>Cancel</button>
        </div>
      }
    >

      {/* Wizard tab bar */}
      <div className="psb-wizard-tabs">
        {TABS.map((label, i) => (
          <div
            key={label}
            className={`psb-wizard-tab${i === tabIndex ? ' active' : ''}${i < tabIndex ? ' done' : ''}`}
            onClick={() => i < tabIndex && setTab(TAB_IDS[i])}
          >
            <span className="psb-wizard-tab-num">{i < tabIndex ? '✓' : i + 1}</span>
            <span className="psb-wizard-tab-label">{label}</span>
            {i < TABS.length - 1 && <span className="psb-wizard-tab-sep">›</span>}
          </div>
        ))}
      </div>

      {/* ── Basics ─────────────────────────────────────────────── */}
      {tab === 'basics' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            Azure Virtual Network (VNet) is the fundamental building block for private networks in Azure. VNet enables many types of Azure resources to securely communicate with each other, the internet, and on-premises networks.
          </p>

          <div className="psb-field-group">
            <p className="psb-field-group-title">Project details</p>
            <p className="psb-field-group-desc">Select the subscription to manage deployed resources and costs. Use resource groups like folders to organise and manage all your resources.</p>

            <div className="psb-field">
              <label className="psb-label">
                Subscription <span className="psb-required">*</span>
              </label>
              <select className="psb-select" value={form.subscription} onChange={e => update('subscription', e.target.value)}>
                {SUBSCRIPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="psb-field">
              <label className="psb-label">
                Resource group <span className="psb-required">*</span>
                <span className="psb-info-icon" title="A container that holds related resources">ⓘ</span>
              </label>
              <select className="psb-select" value={form.resourceGroup} onChange={e => update('resourceGroup', e.target.value)}>
                {RESOURCE_GROUPS.map(g => <option key={g}>{g}</option>)}
              </select>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                <button className="psb-link" style={{ fontSize: '0.72rem' }}>Create new</button>
              </p>
            </div>
          </div>

          <div className="psb-field-group">
            <p className="psb-field-group-title">Instance details</p>

            <div className="psb-field">
              <label className="psb-label">
                Virtual network name <span className="psb-required">*</span>
              </label>
              <input
                className={`psb-input${errors.name ? ' psb-input--error' : ''}`}
                value={form.name}
                onChange={e => update('name', e.target.value)}
                autoComplete="off"
                placeholder="e.g. vnet-prod-eastus"
              />
              {errors.name && <p className="psb-field-error">{errors.name}</p>}
            </div>

            <div className="psb-field">
              <label className="psb-label">
                Region <span className="psb-required">*</span>
                <span className="psb-info-icon" title="The Azure region where the VNet will be created">ⓘ</span>
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

      {/* ── Security ───────────────────────────────────────────── */}
      {tab === 'security' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            Enhance the security of your virtual network with these additional paid security services.{' '}
            <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more ↗</button>
          </p>

          <div className="psb-security-section">
            <p className="psb-security-heading">Virtual network encryption</p>
            <p className="psb-security-desc">
              Enable Virtual network encryption to encrypt traffic traveling within the virtual network.
              Virtual machines must have accelerated networking enabled. Traffic to public IP addresses
              is not encrypted.{' '}
              <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more.</button>
            </p>
            <label className="psb-checkbox-label">
              <input type="checkbox" className="psb-checkbox" />
              Virtual network encryption
            </label>
          </div>

          <div className="psb-security-section">
            <p className="psb-security-heading">Azure Bastion</p>
            <p className="psb-security-desc">
              Azure Bastion is a paid service that provides secure RDP/SSH connectivity to your virtual
              machines over TLS. When you connect via Azure Bastion, your virtual machines do not need
              a public IP address.{' '}
              <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more.</button>
            </p>
            <label className="psb-checkbox-label">
              <input type="checkbox" className="psb-checkbox" />
              Enable Azure Bastion
              <span className="psb-info-icon" title="Deploys a dedicated subnet and public IP for the Bastion host">ⓘ</span>
            </label>
          </div>

          <div className="psb-security-section">
            <p className="psb-security-heading">Azure Firewall</p>
            <p className="psb-security-desc">
              Azure Firewall is a managed cloud-based network security service that protects your Azure
              Virtual Network resources.{' '}
              <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more.</button>
            </p>
            <label className="psb-checkbox-label">
              <input type="checkbox" className="psb-checkbox" />
              Enable Azure Firewall
              <span className="psb-info-icon" title="Requires an AzureFirewallSubnet with a /26 or larger address range">ⓘ</span>
            </label>
          </div>
        </div>
      )}

      {/* ── IP addresses ───────────────────────────────────────── */}
      {tab === 'ip' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            Define the IPv4 address space and add subnets. Each subnet must fall within the address space of the virtual network.
          </p>

          <div className="psb-field-group">
            <p className="psb-field-group-title">IPv4 address space</p>
            <div className="psb-field">
              <label className="psb-label">
                Add IPv4 address space <span className="psb-required">*</span>
                <span className="psb-info-icon" title="The private IP address range for this VNet in CIDR notation">ⓘ</span>
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <input
                  className={`psb-input${errors.addressSpace ? ' psb-input--error' : ''}`}
                  value={addressSpace}
                  onChange={e => { setAddressSpace(e.target.value); setErrors(prev => ({ ...prev, addressSpace: '' })); }}
                  placeholder="e.g. 10.1.0.0/16"
                  autoComplete="off"
                  style={{ flex: 1 }}
                />
                <button
                  className="psb-btn"
                  onClick={() => setAddressSpace('')}
                  title="Remove address space"
                  style={{ padding: '0 0.5rem', height: 30 }}
                >
                  <TrashIcon />
                </button>
              </div>
              {errors.addressSpace && <p className="psb-field-error">{errors.addressSpace}</p>}
            </div>
            <button className="psb-link psb-link--sm" style={{ marginTop: '0.25rem' }}>+ Add another address space</button>
          </div>

          <div className="psb-field-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <p className="psb-field-group-title" style={{ margin: 0 }}>Subnets</p>
              <button className="psb-cmd psb-cmd--sm psb-cmd--primary" onClick={handleAddSubnet} style={{ margin: 0 }}>
                <svg viewBox="0 0 20 20" fill="currentColor" width="11" height="11" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Add a subnet
              </button>
            </div>

            {subnets.length === 0 ? (
              <div className="psb-empty-subnets">
                No subnets configured. Click <strong>Add a subnet</strong> to add one.
              </div>
            ) : (
              <table className="psb-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address range</th>
                    <th>NAT gateway</th>
                    <th>Security group</th>
                    <th style={{ width: 60 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {subnets.map(s => (
                    <tr key={s.name}>
                      <td>{s.name}</td>
                      <td>{s.range}</td>
                      <td><span style={{ color: 'var(--text-muted)' }}>—</span></td>
                      <td><span style={{ color: 'var(--text-muted)' }}>—</span></td>
                      <td>
                        <button
                          className="psb-btn psb-btn--ghost"
                          onClick={() => handleDeleteSubnet(s.name)}
                          title="Remove subnet"
                          style={{ padding: '0.1rem 0.4rem' }}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── Tags ───────────────────────────────────────────────── */}
      {tab === 'tags' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            Tags are name/value pairs that enable you to categorise resources and view consolidated billing by applying the same tag to multiple resources.
          </p>
          <div className="psb-tags">
            <div className="psb-tags-header">
              <span>Name</span><span>Value</span><span>Resource</span>
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

      {/* ── Review + create ────────────────────────────────────── */}
      {tab === 'review' && (
        <div className="psb-form">
          {canCreate ? (
            <div className="psb-validation-banner psb-validation-banner--ok">
              <span className="psb-validation-icon">✓</span>
              Validation passed
            </div>
          ) : (
            <div className="psb-validation-banner" style={{ background: 'var(--wrong-bg)', color: 'var(--wrong)', border: '1px solid var(--wrong-border, var(--wrong))' }}>
              <span className="psb-validation-icon">✗</span>
              Validation failed — complete all required fields before creating.
            </div>
          )}

          <p className="psb-section-desc">Review the configuration for your virtual network before creating it.</p>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Basics</p>
            <table className="psb-review-table">
              <tbody>
                <tr><td>Subscription</td><td>{form.subscription}</td></tr>
                <tr><td>Resource group</td><td>{form.resourceGroup}</td></tr>
                <tr><td>Name</td><td><strong>{form.name || <em style={{ color: 'var(--text-muted)' }}>Not set</em>}</strong></td></tr>
                <tr><td>Region</td><td>{form.region || <em style={{ color: 'var(--text-muted)' }}>Not set</em>}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Security</p>
            <table className="psb-review-table">
              <tbody>
                <tr><td>Virtual network encryption</td><td>Disabled</td></tr>
                <tr><td>Azure Bastion</td><td>Disabled</td></tr>
                <tr><td>Azure Firewall</td><td>Disabled</td></tr>
              </tbody>
            </table>
          </div>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Address space</p>
            <table className="psb-review-table">
              <tbody>
                <tr><td>Address space</td><td><strong>{addressSpace || <em style={{ color: 'var(--text-muted)' }}>Not set</em>}</strong></td></tr>
                {subnets.length > 0 && subnets.map(s => (
                  <tr key={s.name}><td>Subnet: {s.name}</td><td>{s.range}</td></tr>
                ))}
                {subnets.length === 0 && (
                  <tr><td>Subnets</td><td><em style={{ color: 'var(--text-muted)' }}>None configured</em></td></tr>
                )}
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
