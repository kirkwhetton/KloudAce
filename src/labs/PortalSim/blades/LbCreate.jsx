import { useState } from 'react';
import BladeShell from '../BladeShell';
import { VirtualNetworkIcon } from '../AzureIcons';

const SUBSCRIPTIONS   = ['Pay-As-You-Go', 'Dev / Test', 'Production'];
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

const TABS    = ['Basics', 'Frontend IP configuration', 'Backend pools', 'Inbound rules', 'Tags', 'Review + create'];
const TAB_IDS = ['basics', 'frontend', 'backend', 'rules', 'tags', 'review'];

const AVAILABLE_VMS = [
  { name: 'vm-web-01', size: 'Standard_D2s_v5', zone: '1' },
  { name: 'vm-web-02', size: 'Standard_D2s_v5', zone: '2' },
  { name: 'vm-web-03', size: 'Standard_D2s_v5', zone: '3' },
];

const AVAILABLE_VNETS = [
  {
    name: 'vnet-hub-westus2', space: '10.0.0.0/16',
    subnets: [
      ['GatewaySubnet', '10.0.0.0/27', '27'],
      ['AzureBastionSubnet', '10.0.1.0/26', '59'],
      ['snet-shared', '10.0.2.0/24', '251'],
    ],
  },
  {
    name: 'vnet-spoke-eastus', space: '10.10.0.0/16',
    subnets: [
      ['snet-app', '10.10.0.0/24', '251'],
      ['snet-data', '10.10.1.0/24', '251'],
    ],
  },
];

const TrashIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
  </svg>
);

export default function LbCreate({ onOpen, onClose, onSubmit, completed }) {
  const [tab,  setTab]  = useState('basics');
  const [form, setForm] = useState({
    subscription: 'Pay-As-You-Go',
    resourceGroup: 'rg-networking',
    name: '',
    region: '',
    sku: 'Standard',
    type: 'Internal',
    tier: 'Regional',
  });
  const [frontends, setFrontends] = useState([]);
  const [frontendDraft, setFrontendDraft] = useState({
    name: '', ipVersion: 'IPv4', ipType: 'IP address', allocation: 'Dynamic',
    vnet: AVAILABLE_VNETS[0].name, publicIp: '', gatewayLb: 'None',
  });
  const [publicIps, setPublicIps] = useState([]);

  const openVnetOverview = (vnetName) => {
    const vnet = AVAILABLE_VNETS.find(v => v.name === vnetName);
    if (!vnet) return;
    onOpen('resource-overview', {
      title: vnet.name,
      subtitle: 'Virtual network',
      icon: <VirtualNetworkIcon size={22} />,
      essentials: [
        { key: 'Address space', value: vnet.space },
        { key: 'Connected devices', value: vnet.subnets.reduce((n, s) => n + Number(s[2]), 0) },
      ],
      table: {
        tabLabel: 'Subnets',
        description: `Address space ${vnet.space} divided into ${vnet.subnets.length} subnet${vnet.subnets.length === 1 ? '' : 's'}.`,
        columns: ['Name', 'Address range', 'Available addresses'],
        rows: vnet.subnets,
      },
    });
  };
  const [backendPools, setBackendPools] = useState([]);
  const [backendDraft, setBackendDraft] = useState('');
  const [vmDraft, setVmDraft] = useState('');
  const [probes, setProbes] = useState([]);
  const [probeDraft, setProbeDraft] = useState({ name: '', protocol: 'HTTP', port: '80', path: '/', interval: '5', threshold: '2' });
  const [rules, setRules] = useState([]);
  const [ruleDraft, setRuleDraft] = useState({ name: '', frontendPort: '', backendPort: '', protocol: 'TCP', probeName: '' });
  const [tags, setTags] = useState([{ name: '', value: '' }]);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleCreatePublicIp = (pip) => {
    setPublicIps(prev => [...prev, pip]);
    setFrontendDraft(prev => ({ ...prev, publicIp: pip.name }));
    setErrors(prev => ({ ...prev, publicIp: '' }));
  };

  const validateBasics = () => {
    const errs = {};
    if (!form.name.trim())
      errs.name = 'Load balancer name is required.';
    else if (!/^[a-zA-Z0-9][a-zA-Z0-9_.\-]*$/.test(form.name.trim()))
      errs.name = 'Name must start with a letter or number.';
    if (!form.region) errs.region = 'Region is required.';
    return errs;
  };

  const handleAddFrontend = () => {
    const errs = {};
    if (!frontendDraft.name.trim()) errs.frontendName = 'Frontend IP name is required.';
    if (form.type === 'Public' && !frontendDraft.publicIp) errs.publicIp = 'Select a public IP address.';
    if (Object.keys(errs).length) { setErrors(prev => ({ ...prev, ...errs })); return; }
    setFrontends(prev => [...prev, { ...frontendDraft, name: frontendDraft.name.trim() }]);
    setFrontendDraft({
      name: '', ipVersion: 'IPv4', ipType: 'IP address', allocation: 'Dynamic',
      vnet: AVAILABLE_VNETS[0].name, publicIp: '', gatewayLb: 'None',
    });
    setErrors(prev => ({ ...prev, frontendName: '', publicIp: '' }));
  };

  const handleAddBackendPool = () => {
    if (!backendDraft.trim()) {
      setErrors(prev => ({ ...prev, backendName: 'Backend pool name is required.' }));
      return;
    }
    setBackendPools(prev => [...prev, { name: backendDraft.trim(), vms: [] }]);
    setBackendDraft('');
    setErrors(prev => ({ ...prev, backendName: '' }));
  };

  const handleAddVm = (poolIndex) => {
    if (!vmDraft) {
      setErrors(prev => ({ ...prev, vmName: 'Select a virtual machine to add.' }));
      return;
    }
    setBackendPools(prev => prev.map((p, i) => i === poolIndex ? { ...p, vms: [...p.vms, vmDraft] } : p));
    setVmDraft('');
    setErrors(prev => ({ ...prev, vmName: '' }));
  };

  const handleRemoveVm = (poolIndex, vmName) => {
    setBackendPools(prev => prev.map((p, i) => i === poolIndex ? { ...p, vms: p.vms.filter(v => v !== vmName) } : p));
  };

  const handleAddProbe = () => {
    const errs = {};
    if (!probeDraft.name.trim()) errs.probeName = 'Health probe name is required.';
    if (!probeDraft.port.trim() || isNaN(Number(probeDraft.port))) errs.probePort = 'Enter a valid port number.';
    if (probeDraft.protocol !== 'TCP' && !probeDraft.path.trim()) errs.probePath = 'Path is required for HTTP/HTTPS probes.';
    if (Object.keys(errs).length) { setErrors(prev => ({ ...prev, ...errs })); return; }
    setProbes(prev => [...prev, { ...probeDraft, name: probeDraft.name.trim() }]);
    setProbeDraft({ name: '', protocol: 'HTTP', port: '80', path: '/', interval: '5', threshold: '2' });
    setErrors(prev => ({ ...prev, probeName: '', probePort: '', probePath: '' }));
  };

  const handleAddRule = () => {
    const errs = {};
    if (!ruleDraft.name.trim()) errs.ruleName = 'Load balancing rule name is required.';
    if (!ruleDraft.frontendPort.trim() || isNaN(Number(ruleDraft.frontendPort))) errs.frontendPort = 'Enter a valid frontend port.';
    if (!ruleDraft.backendPort.trim() || isNaN(Number(ruleDraft.backendPort))) errs.backendPort = 'Enter a valid backend port.';
    if (!ruleDraft.probeName) errs.ruleProbe = 'Select a health probe.';
    if (Object.keys(errs).length) { setErrors(prev => ({ ...prev, ...errs })); return; }
    setRules(prev => [...prev, { ...ruleDraft, name: ruleDraft.name.trim() }]);
    setRuleDraft({ name: '', frontendPort: '', backendPort: '', protocol: 'TCP', probeName: '' });
    setErrors(prev => ({ ...prev, ruleName: '', frontendPort: '', backendPort: '', ruleProbe: '' }));
  };

  const handleNext = () => {
    if (tab === 'basics') {
      const errs = validateBasics();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setTab('frontend');
    } else if (tab === 'frontend') {
      setTab('backend');
    } else if (tab === 'backend') {
      setTab('rules');
    } else if (tab === 'rules') {
      setTab('tags');
    } else if (tab === 'tags') {
      setTab('review');
    } else {
      const frontend = frontends[0] ?? {};
      const pool     = backendPools[0] ?? {};
      const probe    = probes[0] ?? {};
      const rule     = rules[0] ?? {};
      onSubmit({
        name:           form.name.trim(),
        region:         form.region,
        sku:            form.sku,
        type:           form.type,
        frontendName:   frontend.name ?? '',
        publicIpName:   frontend.publicIp ?? '',
        backendPoolName: pool.name ?? '',
        vms:            (pool.vms ?? []).slice().sort().join(', '),
        ruleName:       rule.name ?? '',
        frontendPort:   rule.frontendPort ?? '',
        backendPort:    rule.backendPort ?? '',
        probeName:      probe.name ?? '',
        probeProtocol:  probe.protocol ?? '',
        probePort:      probe.port ?? '',
        probePath:      probe.path ?? '',
      });
    }
  };

  const handlePrev = () => {
    if (tab === 'frontend') setTab('basics');
    if (tab === 'backend')  setTab('frontend');
    if (tab === 'rules')    setTab('backend');
    if (tab === 'tags')     setTab('rules');
    if (tab === 'review')   setTab('tags');
  };

  const tabIndex = TAB_IDS.indexOf(tab);
  const canCreate = form.name && form.region && frontends.length > 0 && backendPools.length > 0 && rules.length > 0;

  return (
    <BladeShell
      title="Create load balancer"
      width={760}
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
            Azure Load Balancer is a high-performance, low-latency Layer 4 (TCP, UDP) load balancer that distributes
            inbound traffic across healthy virtual machine instances to maximise availability and performance.
          </p>

          <div className="psb-field-group">
            <p className="psb-field-group-title">Project details</p>

            <div className="psb-field">
              <label className="psb-label">Subscription <span className="psb-required">*</span></label>
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
                autoComplete="off"
                placeholder="e.g. lb-web-prod"
              />
              {errors.name && <p className="psb-field-error">{errors.name}</p>}
            </div>

            <div className="psb-field">
              <label className="psb-label">
                Region <span className="psb-required">*</span>
                <span className="psb-info-icon" title="The Azure region where the load balancer will be created">ⓘ</span>
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

            <div className="psb-field">
              <label className="psb-label">
                SKU
                <span className="psb-info-icon" title="Standard SKU is recommended for production workloads">ⓘ</span>
              </label>
              <div className="psb-toggle-row">
                {['Basic', 'Standard', 'Gateway'].map(sku => (
                  <label key={sku} className="psb-toggle-option">
                    <input type="radio" name="lb-sku" checked={form.sku === sku} onChange={() => update('sku', sku)} />
                    {sku}
                  </label>
                ))}
              </div>
            </div>

            <div className="psb-field">
              <label className="psb-label">
                Type
                <span className="psb-info-icon" title="Public load balancers map a public IP to backend resources; internal load balancers use a private IP only">ⓘ</span>
              </label>
              <div className="psb-toggle-row">
                {['Public', 'Internal'].map(t => (
                  <label key={t} className="psb-toggle-option">
                    <input type="radio" name="lb-type" checked={form.type === t} onChange={() => update('type', t)} />
                    {t}
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
                      <input type="radio" name="lb-tier" checked={form.tier === t} onChange={() => update('tier', t)} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Frontend IP configuration ─────────────────────────────── */}
      {tab === 'frontend' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            A frontend IP configuration is the IP address that clients use to reach the load balancer.
            For a public load balancer this is a public IP address; for an internal load balancer it is
            a private IP address from the virtual network.{' '}
            <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more ↗</button>
          </p>

          <table className="psb-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>IP version</th>
                <th>{form.type === 'Public' ? 'Public IP address' : 'Allocation'}</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {frontends.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.6rem 1rem' }}>
                    No frontend IP configuration added
                  </td>
                </tr>
              ) : (
                frontends.map((f, i) => (
                  <tr key={i}>
                    <td><button className="psb-link">{f.name}</button></td>
                    <td>{f.ipVersion}</td>
                    <td>{form.type === 'Public' ? f.publicIp : f.allocation}</td>
                    <td>
                      <button className="psb-icon-action-btn" title="Remove" onClick={() => setFrontends(prev => prev.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {frontends.length === 0 && (
            <div className="psb-field-group" style={{ marginTop: '1rem' }}>
              <p className="psb-field-group-title">Add a frontend IP configuration</p>

              <div className="psb-field">
                <label className="psb-label">Name <span className="psb-required">*</span></label>
                <input
                  className={`psb-input${errors.frontendName ? ' psb-input--error' : ''}`}
                  value={frontendDraft.name}
                  onChange={e => { setFrontendDraft(prev => ({ ...prev, name: e.target.value })); setErrors(prev => ({ ...prev, frontendName: '' })); }}
                  placeholder="e.g. fe-web"
                  autoComplete="off"
                />
                {errors.frontendName && <p className="psb-field-error">{errors.frontendName}</p>}
              </div>

              <div className="psb-field">
                <label className="psb-label">IP version</label>
                <div className="psb-toggle-row">
                  {['IPv4', 'IPv6'].map(v => (
                    <label key={v} className="psb-toggle-option">
                      <input type="radio" name="fe-ipver" checked={frontendDraft.ipVersion === v} onChange={() => setFrontendDraft(prev => ({ ...prev, ipVersion: v }))} />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              {form.type === 'Public' ? (
                <>
                  <div className="psb-field">
                    <label className="psb-label">IP type</label>
                    <div className="psb-toggle-row">
                      {['IP address', 'IP prefix'].map(t => (
                        <label key={t} className="psb-toggle-option">
                          <input type="radio" name="fe-iptype" checked={frontendDraft.ipType === t} onChange={() => setFrontendDraft(prev => ({ ...prev, ipType: t }))} />
                          {t}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="psb-field">
                    <label className="psb-label">Public IP address <span className="psb-required">*</span></label>
                    <select
                      className={`psb-select${errors.publicIp ? ' psb-input--error' : ''}`}
                      value={frontendDraft.publicIp}
                      onChange={e => { setFrontendDraft(prev => ({ ...prev, publicIp: e.target.value })); setErrors(prev => ({ ...prev, publicIp: '' })); }}
                    >
                      <option value="">Select public IP address</option>
                      {publicIps.map(ip => (
                        <option key={ip.name} value={ip.name}>{ip.name}</option>
                      ))}
                    </select>
                    {errors.publicIp && <p className="psb-field-error">{errors.publicIp}</p>}
                    <button
                      type="button"
                      className="psb-link"
                      style={{ fontSize: '0.78rem', marginTop: '0.3rem' }}
                      onClick={() => onOpen('public-ip-create', { region: form.region, onCreate: handleCreatePublicIp })}
                    >
                      Create new
                    </button>
                  </div>

                  <div className="psb-field">
                    <label className="psb-label">
                      Gateway Load balancer
                      <span className="psb-info-icon" title="Chain this load balancer's traffic through a gateway load balancer for third-party network appliances">ⓘ</span>
                    </label>
                    <select className="psb-select" value={frontendDraft.gatewayLb} onChange={e => setFrontendDraft(prev => ({ ...prev, gatewayLb: e.target.value }))}>
                      <option>None</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="psb-field">
                    <label className="psb-label">
                      Virtual network <span className="psb-required">*</span>
                      <span className="psb-info-icon" title="The virtual network the private frontend IP will be allocated from">ⓘ</span>
                    </label>
                    <div className="psb-toggle-row" style={{ alignItems: 'center', gap: '0.5rem' }}>
                      <select
                        className="psb-select"
                        value={frontendDraft.vnet}
                        onChange={e => setFrontendDraft(prev => ({ ...prev, vnet: e.target.value }))}
                      >
                        {AVAILABLE_VNETS.map(v => <option key={v.name}>{v.name}</option>)}
                      </select>
                      <button type="button" className="psb-link" style={{ fontSize: '0.78rem' }} onClick={() => openVnetOverview(frontendDraft.vnet)}>
                        View address space
                      </button>
                    </div>
                  </div>

                  <div className="psb-field">
                    <label className="psb-label">
                      IP address assignment
                      <span className="psb-info-icon" title="Static assigns a fixed IP that won't change; Dynamic is assigned at allocation time">ⓘ</span>
                    </label>
                    <div className="psb-toggle-row">
                      {['Dynamic', 'Static'].map(a => (
                        <label key={a} className="psb-toggle-option">
                          <input type="radio" name="fe-alloc" checked={frontendDraft.allocation === a} onChange={() => setFrontendDraft(prev => ({ ...prev, allocation: a }))} />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button className="psb-add-subnet-link" onClick={handleAddFrontend}>
                <PlusIcon />
                Add
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Backend pools ──────────────────────────────────────────── */}
      {tab === 'backend' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            A backend pool contains the IP addresses of the virtual machines or instances that will receive
            network traffic from the load balancer.{' '}
            <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more ↗</button>
          </p>

          <table className="psb-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Virtual machines</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {backendPools.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.6rem 1rem' }}>
                    No backend pools added
                  </td>
                </tr>
              ) : (
                backendPools.map((p, i) => (
                  <tr key={i}>
                    <td><button className="psb-link">{p.name}</button></td>
                    <td>{p.vms.length === 0 ? <em style={{ color: 'var(--text-muted)' }}>None</em> : p.vms.join(', ')}</td>
                    <td>
                      <button className="psb-icon-action-btn" title="Remove" onClick={() => setBackendPools(prev => prev.filter((_, j) => j !== i))}>
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {backendPools.length === 0 && (
            <div className="psb-field-group" style={{ marginTop: '1rem' }}>
              <p className="psb-field-group-title">Add a backend pool</p>
              <div className="psb-field">
                <label className="psb-label">Name <span className="psb-required">*</span></label>
                <input
                  className={`psb-input${errors.backendName ? ' psb-input--error' : ''}`}
                  value={backendDraft}
                  onChange={e => { setBackendDraft(e.target.value); setErrors(prev => ({ ...prev, backendName: '' })); }}
                  placeholder="e.g. pool-web"
                  autoComplete="off"
                />
                {errors.backendName && <p className="psb-field-error">{errors.backendName}</p>}
              </div>
              <button className="psb-add-subnet-link" onClick={handleAddBackendPool}>
                <PlusIcon />
                Add
              </button>
            </div>
          )}

          {backendPools.length > 0 && (
            <div className="psb-field-group" style={{ marginTop: '1rem' }}>
              <p className="psb-field-group-title">Add virtual machines to {backendPools[0].name}</p>
              <p className="psb-section-desc">
                Associate the network interfaces of one or more virtual machines with this backend pool so the
                load balancer can distribute traffic to them.
              </p>

              <table className="psb-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Availability zone</th>
                    <th style={{ width: 40 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {backendPools[0].vms.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.6rem 1rem' }}>
                        No virtual machines added
                      </td>
                    </tr>
                  ) : (
                    backendPools[0].vms.map(vmName => {
                      const vm = AVAILABLE_VMS.find(v => v.name === vmName);
                      return (
                        <tr key={vmName}>
                          <td><button className="psb-link">{vmName}</button></td>
                          <td>{vm?.size}</td>
                          <td>{vm?.zone}</td>
                          <td>
                            <button className="psb-icon-action-btn" title="Remove" onClick={() => handleRemoveVm(0, vmName)}>
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              {backendPools[0].vms.length < AVAILABLE_VMS.length && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div className="psb-field">
                    <label className="psb-label">Virtual machine <span className="psb-required">*</span></label>
                    <div className="psb-toggle-row" style={{ alignItems: 'center', gap: '0.5rem' }}>
                      <select
                        className={`psb-select${errors.vmName ? ' psb-input--error' : ''}`}
                        value={vmDraft}
                        onChange={e => { setVmDraft(e.target.value); setErrors(prev => ({ ...prev, vmName: '' })); }}
                      >
                        <option value="">Select a virtual machine</option>
                        {AVAILABLE_VMS.filter(vm => !backendPools[0].vms.includes(vm.name)).map(vm => (
                          <option key={vm.name} value={vm.name}>{vm.name} ({vm.size})</option>
                        ))}
                      </select>
                      <button className="psb-add-subnet-link" onClick={() => handleAddVm(0)} style={{ marginTop: 0 }}>
                        <PlusIcon />
                        Add
                      </button>
                    </div>
                    {errors.vmName && <p className="psb-field-error">{errors.vmName}</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Inbound rules (load balancing rules + health probes) ──── */}
      {tab === 'rules' && (
        <div className="psb-form">
          <p className="psb-section-desc">
            A load balancing rule maps a frontend IP and port to a backend pool and port, and uses a health
            probe to determine which backend instances can receive new connections.{' '}
            <button className="psb-link" style={{ fontSize: 'inherit' }}>Learn more ↗</button>
          </p>

          {/* Health probes */}
          <div className="psb-field-group">
            <p className="psb-field-group-title">Health probes</p>

            <table className="psb-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Protocol</th>
                  <th>Port</th>
                  <th>Path</th>
                  <th>Interval (s)</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {probes.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.6rem 1rem' }}>
                      No health probes added
                    </td>
                  </tr>
                ) : (
                  probes.map((p, i) => (
                    <tr key={i}>
                      <td><button className="psb-link">{p.name}</button></td>
                      <td>{p.protocol}</td>
                      <td>{p.port}</td>
                      <td>{p.protocol === 'TCP' ? '—' : p.path}</td>
                      <td>{p.interval}</td>
                      <td>
                        <button className="psb-icon-action-btn" title="Remove" onClick={() => setProbes(prev => prev.filter((_, j) => j !== i))}>
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {probes.length === 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <div className="psb-field">
                  <label className="psb-label">Name <span className="psb-required">*</span></label>
                  <input
                    className={`psb-input${errors.probeName ? ' psb-input--error' : ''}`}
                    value={probeDraft.name}
                    onChange={e => { setProbeDraft(prev => ({ ...prev, name: e.target.value })); setErrors(prev => ({ ...prev, probeName: '' })); }}
                    placeholder="e.g. probe-http"
                    autoComplete="off"
                  />
                  {errors.probeName && <p className="psb-field-error">{errors.probeName}</p>}
                </div>

                <div className="psb-field">
                  <label className="psb-label">Protocol</label>
                  <div className="psb-toggle-row">
                    {['HTTP', 'HTTPS', 'TCP'].map(p => (
                      <label key={p} className="psb-toggle-option">
                        <input type="radio" name="probe-proto" checked={probeDraft.protocol === p} onChange={() => setProbeDraft(prev => ({ ...prev, protocol: p }))} />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="psb-field">
                  <label className="psb-label">Port <span className="psb-required">*</span></label>
                  <input
                    className={`psb-input${errors.probePort ? ' psb-input--error' : ''}`}
                    value={probeDraft.port}
                    onChange={e => { setProbeDraft(prev => ({ ...prev, port: e.target.value })); setErrors(prev => ({ ...prev, probePort: '' })); }}
                    placeholder="80"
                    autoComplete="off"
                    style={{ maxWidth: 120 }}
                  />
                  {errors.probePort && <p className="psb-field-error">{errors.probePort}</p>}
                </div>

                {probeDraft.protocol !== 'TCP' && (
                  <div className="psb-field">
                    <label className="psb-label">Path <span className="psb-required">*</span></label>
                    <input
                      className={`psb-input${errors.probePath ? ' psb-input--error' : ''}`}
                      value={probeDraft.path}
                      onChange={e => { setProbeDraft(prev => ({ ...prev, path: e.target.value })); setErrors(prev => ({ ...prev, probePath: '' })); }}
                      placeholder="/healthz"
                      autoComplete="off"
                    />
                    {errors.probePath && <p className="psb-field-error">{errors.probePath}</p>}
                  </div>
                )}

                <div className="psb-field">
                  <label className="psb-label">Interval (seconds)</label>
                  <input
                    className="psb-input"
                    value={probeDraft.interval}
                    onChange={e => setProbeDraft(prev => ({ ...prev, interval: e.target.value }))}
                    autoComplete="off"
                    style={{ maxWidth: 120 }}
                  />
                </div>

                <button className="psb-add-subnet-link" onClick={handleAddProbe}>
                  <PlusIcon />
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Load balancing rules */}
          <div className="psb-field-group">
            <p className="psb-field-group-title">Load balancing rules</p>

            <table className="psb-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Protocol</th>
                  <th>Frontend port</th>
                  <th>Backend port</th>
                  <th>Health probe</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {rules.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.6rem 1rem' }}>
                      No load balancing rules added
                    </td>
                  </tr>
                ) : (
                  rules.map((r, i) => (
                    <tr key={i}>
                      <td><button className="psb-link">{r.name}</button></td>
                      <td>{r.protocol}</td>
                      <td>{r.frontendPort}</td>
                      <td>{r.backendPort}</td>
                      <td>{r.probeName}</td>
                      <td>
                        <button className="psb-icon-action-btn" title="Remove" onClick={() => setRules(prev => prev.filter((_, j) => j !== i))}>
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {rules.length === 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                {probes.length === 0 ? (
                  <p className="psb-text-muted" style={{ fontSize: '0.78rem', fontStyle: 'italic' }}>
                    Add a health probe above before creating a load balancing rule.
                  </p>
                ) : (
                  <>
                    <div className="psb-field">
                      <label className="psb-label">Name <span className="psb-required">*</span></label>
                      <input
                        className={`psb-input${errors.ruleName ? ' psb-input--error' : ''}`}
                        value={ruleDraft.name}
                        onChange={e => { setRuleDraft(prev => ({ ...prev, name: e.target.value })); setErrors(prev => ({ ...prev, ruleName: '' })); }}
                        placeholder="e.g. rule-http"
                        autoComplete="off"
                      />
                      {errors.ruleName && <p className="psb-field-error">{errors.ruleName}</p>}
                    </div>

                    <div className="psb-field">
                      <label className="psb-label">Protocol</label>
                      <div className="psb-toggle-row">
                        {['TCP', 'UDP'].map(p => (
                          <label key={p} className="psb-toggle-option">
                            <input type="radio" name="rule-proto" checked={ruleDraft.protocol === p} onChange={() => setRuleDraft(prev => ({ ...prev, protocol: p }))} />
                            {p}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="psb-field">
                      <label className="psb-label">Frontend port <span className="psb-required">*</span></label>
                      <input
                        className={`psb-input${errors.frontendPort ? ' psb-input--error' : ''}`}
                        value={ruleDraft.frontendPort}
                        onChange={e => { setRuleDraft(prev => ({ ...prev, frontendPort: e.target.value })); setErrors(prev => ({ ...prev, frontendPort: '' })); }}
                        placeholder="80"
                        autoComplete="off"
                        style={{ maxWidth: 120 }}
                      />
                      {errors.frontendPort && <p className="psb-field-error">{errors.frontendPort}</p>}
                    </div>

                    <div className="psb-field">
                      <label className="psb-label">Backend port <span className="psb-required">*</span></label>
                      <input
                        className={`psb-input${errors.backendPort ? ' psb-input--error' : ''}`}
                        value={ruleDraft.backendPort}
                        onChange={e => { setRuleDraft(prev => ({ ...prev, backendPort: e.target.value })); setErrors(prev => ({ ...prev, backendPort: '' })); }}
                        placeholder="80"
                        autoComplete="off"
                        style={{ maxWidth: 120 }}
                      />
                      {errors.backendPort && <p className="psb-field-error">{errors.backendPort}</p>}
                    </div>

                    <div className="psb-field">
                      <label className="psb-label">Health probe <span className="psb-required">*</span></label>
                      <select
                        className={`psb-select${errors.ruleProbe ? ' psb-input--error' : ''}`}
                        value={ruleDraft.probeName}
                        onChange={e => { setRuleDraft(prev => ({ ...prev, probeName: e.target.value })); setErrors(prev => ({ ...prev, ruleProbe: '' })); }}
                      >
                        <option value="">Select a health probe</option>
                        {probes.map(p => <option key={p.name}>{p.name}</option>)}
                      </select>
                      {errors.ruleProbe && <p className="psb-field-error">{errors.ruleProbe}</p>}
                    </div>

                    <button className="psb-add-subnet-link" onClick={handleAddRule}>
                      <PlusIcon />
                      Add
                    </button>
                  </>
                )}
              </div>
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
            <div className="psb-validation-banner" style={{ background: 'var(--wrong-bg)', color: 'var(--wrong)', border: '1px solid var(--wrong)' }}>
              <span className="psb-validation-icon">✗</span>
              Validation failed — add a frontend IP, a backend pool, and a load balancing rule before creating.
            </div>
          )}

          <p className="psb-section-desc">Review the configuration for your load balancer before creating it.</p>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Basics</p>
            <table className="psb-review-table">
              <tbody>
                <tr><td>Subscription</td><td>{form.subscription}</td></tr>
                <tr><td>Resource group</td><td>{form.resourceGroup}</td></tr>
                <tr><td>Name</td><td><strong>{form.name || <em style={{ color: 'var(--text-muted)' }}>Not set</em>}</strong></td></tr>
                <tr><td>Region</td><td>{form.region || <em style={{ color: 'var(--text-muted)' }}>Not set</em>}</td></tr>
                <tr><td>SKU</td><td>{form.sku}</td></tr>
                <tr><td>Type</td><td>{form.type}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Frontend IP configuration</p>
            <table className="psb-review-table">
              <tbody>
                {frontends.length === 0 ? (
                  <tr><td colSpan={2}><em style={{ color: 'var(--text-muted)' }}>None added</em></td></tr>
                ) : frontends.map((f, i) => (
                  <tr key={i}><td>{f.name}</td><td>{f.ipVersion}, {form.type === 'Public' ? f.publicIp : f.allocation}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Backend pools</p>
            <table className="psb-review-table">
              <tbody>
                {backendPools.length === 0 ? (
                  <tr><td colSpan={2}><em style={{ color: 'var(--text-muted)' }}>None added</em></td></tr>
                ) : backendPools.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.vms.length === 0 ? <em style={{ color: 'var(--text-muted)' }}>No VMs added</em> : p.vms.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Health probes</p>
            <table className="psb-review-table">
              <tbody>
                {probes.length === 0 ? (
                  <tr><td colSpan={2}><em style={{ color: 'var(--text-muted)' }}>None added</em></td></tr>
                ) : probes.map((p, i) => (
                  <tr key={i}><td>{p.name}</td><td>{p.protocol}:{p.port}{p.protocol !== 'TCP' ? ` ${p.path}` : ''}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="psb-review-section">
            <p className="psb-review-section-title">Load balancing rules</p>
            <table className="psb-review-table">
              <tbody>
                {rules.length === 0 ? (
                  <tr><td colSpan={2}><em style={{ color: 'var(--text-muted)' }}>None added</em></td></tr>
                ) : rules.map((r, i) => (
                  <tr key={i}><td>{r.name}</td><td>{r.protocol} {r.frontendPort} → {r.backendPort} (probe: {r.probeName})</td></tr>
                ))}
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
