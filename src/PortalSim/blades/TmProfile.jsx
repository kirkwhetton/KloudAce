import { useState } from 'react';

// ── Hard-coded scenario: priority routing fault ──────────────────
// East US should be Priority 1 (primary) but is misconfigured as
// Priority 2, causing all traffic to route to West Europe instead.
const PROFILE = {
  name:          'tm-prod-api',
  dns:           'tm-prod-api.trafficmanager.net',
  routingMethod: 'Priority',
  status:        'Enabled',
  ttl:           30,
};

const ENDPOINTS = [
  { id: 'ep-eastus', name: 'eastus-api', status: 'Enabled', monitorStatus: 'Online', type: 'Azure endpoint', target: 'api-eastus.azurewebsites.net', priority: 2, weight: 1 },
  { id: 'ep-westeu', name: 'westeu-api', status: 'Enabled', monitorStatus: 'Online', type: 'Azure endpoint', target: 'api-westeu.azurewebsites.net', priority: 1, weight: 1 },
];

const MonitorDot = ({ status }) => {
  const colour = status === 'Online' ? '#107c10' : status === 'Degraded' ? '#d83b01' : '#797979';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colour, flexShrink: 0, display: 'inline-block' }} />
      {status}
    </span>
  );
};

export default function TmProfile({ onSubmit, completed }) {
  const [selected, setSelected]   = useState(null);
  const [activeTab, setActiveTab] = useState('endpoints');

  const handleFaultClick = (faultId) => {
    if (completed) return;
    setSelected(faultId);
    onSubmit({ faultId });
  };

  const faultCell = (faultId, children) => (
    <span
      className={`psb-fault-cell${selected === faultId ? ' psb-fault-cell--selected' : ''}`}
      onClick={() => handleFaultClick(faultId)}
      title="Click if you think this setting is misconfigured"
      role="button"
      tabIndex={completed ? -1 : 0}
      onKeyDown={e => e.key === 'Enter' && handleFaultClick(faultId)}
    >
      {children}
    </span>
  );

  return (
    <div className="ps-blade" style={{ minWidth: 820, maxWidth: 820 }}>

      {/* Blade header */}
      <div className="ps-blade-header" style={{ paddingBottom: '0.6rem' }}>
        <span className="ps-blade-header-icon">
          <svg viewBox="0 0 20 20" fill="#0078d4" width="22" height="22" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
          </svg>
        </span>
        <div className="ps-blade-header-text">
          <h2 className="ps-blade-title">{PROFILE.name}</h2>
          <p className="ps-blade-subtitle">Traffic Manager profile</p>
        </div>
      </div>

      {/* Command bar */}
      <div className="psb-commandbar">
        <button className="psb-cmd" disabled={completed}>
          <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          Add endpoint
        </button>
        <button className="psb-cmd" disabled>
          <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          Delete
        </button>
        <button className="psb-cmd">
          <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
          </svg>
          Refresh
        </button>
      </div>

      <div className="ps-blade-body">

        {/* Essentials */}
        <div className="psb-tm-essentials">
          <div className="psb-tm-essential-row">
            <span className="psb-tm-essential-key">DNS name</span>
            <span className="psb-tm-essential-val psb-link">{PROFILE.dns}</span>
          </div>
          <div className="psb-tm-essential-row">
            <span className="psb-tm-essential-key">Routing method</span>
            <span className="psb-tm-essential-val">
              {faultCell('routing-method',
                <span className="psb-tm-badge">{PROFILE.routingMethod}</span>
              )}
            </span>
          </div>
          <div className="psb-tm-essential-row">
            <span className="psb-tm-essential-key">Status</span>
            <span className="psb-tm-essential-val" style={{ color: '#107c10', fontWeight: 600 }}>{PROFILE.status}</span>
          </div>
          <div className="psb-tm-essential-row">
            <span className="psb-tm-essential-key">DNS TTL</span>
            <span className="psb-tm-essential-val">{PROFILE.ttl} seconds</span>
          </div>
        </div>

        {/* Tab strip */}
        <div className="psb-wizard-tabs" style={{ marginTop: '1rem' }}>
          {[['overview', 'Overview'], ['endpoints', 'Endpoints'], ['configuration', 'Configuration'], ['diagnostics', 'Diagnose and solve problems']].map(([id, label]) => (
            <div
              key={id}
              className={`psb-wizard-tab${activeTab === id ? ' active' : ''}`}
              onClick={() => setActiveTab(id)}
              style={{ cursor: 'pointer' }}
            >
              {label}
              {id === 'endpoints' && <span className="psb-tm-tab-count">{ENDPOINTS.length}</span>}
            </div>
          ))}
        </div>

        {/* Endpoints tab */}
        {activeTab === 'endpoints' && (
          <div style={{ padding: '0 0 1rem' }}>
            <p className="psb-section-desc" style={{ padding: '0.65rem 1rem 0', marginBottom: 0 }}>
              Click on any value you believe is misconfigured to submit your answer.
            </p>
            <table className="psb-table" style={{ marginTop: '0.5rem' }}>
              <thead>
                <tr>
                  <th style={{ width: 28 }}><input type="checkbox" /></th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Monitor status</th>
                  <th>Type</th>
                  <th>Target</th>
                  <th>Priority</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {ENDPOINTS.map(ep => (
                  <tr key={ep.id}>
                    <td><input type="checkbox" /></td>
                    <td><button className="psb-link">{ep.name}</button></td>
                    <td>
                      {faultCell(`${ep.id}-status`,
                        <span style={{ color: ep.status === 'Enabled' ? '#107c10' : '#797979' }}>{ep.status}</span>
                      )}
                    </td>
                    <td><MonitorDot status={ep.monitorStatus} /></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{ep.type}</td>
                    <td style={{ fontSize: '0.78rem' }}>{ep.target}</td>
                    <td>
                      {faultCell(`${ep.id}-priority`,
                        <strong>{ep.priority}</strong>
                      )}
                    </td>
                    <td>{ep.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.3rem 1rem' }}>
              Showing 1 to {ENDPOINTS.length} of {ENDPOINTS.length} records
            </p>
          </div>
        )}

        {activeTab === 'overview' && (
          <div style={{ padding: '1rem' }}>
            <p className="psb-section-desc">
              Switch to the <strong>Endpoints</strong> tab to review the endpoint configuration and identify the fault.
            </p>
          </div>
        )}

        {activeTab === 'configuration' && (
          <div style={{ padding: '1rem' }}>
            <div className="psb-tm-essential-row">
              <span className="psb-tm-essential-key">Routing method</span>
              <span className="psb-tm-essential-val">{PROFILE.routingMethod}</span>
            </div>
            <div className="psb-tm-essential-row">
              <span className="psb-tm-essential-key">DNS TTL (seconds)</span>
              <span className="psb-tm-essential-val">{PROFILE.ttl}</span>
            </div>
            <div className="psb-tm-essential-row">
              <span className="psb-tm-essential-key">Protocol</span>
              <span className="psb-tm-essential-val">HTTPS</span>
            </div>
            <div className="psb-tm-essential-row">
              <span className="psb-tm-essential-key">Port</span>
              <span className="psb-tm-essential-val">443</span>
            </div>
            <div className="psb-tm-essential-row">
              <span className="psb-tm-essential-key">Path</span>
              <span className="psb-tm-essential-val">/health</span>
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div style={{ padding: '1rem' }}>
            <p className="psb-section-desc">Use the Endpoints tab to identify the misconfigured setting causing the routing issue.</p>
          </div>
        )}

      </div>
    </div>
  );
}
