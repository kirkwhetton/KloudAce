import { useState } from 'react';
import BladeShell from '../BladeShell';

// Generic read-only "Overview" blade for resources the user clicks on
// while exploring the portal (VNets, resource groups, load balancers,
// Traffic Manager endpoints, etc). Shows superficial-but-plausible
// details — not tied to lab solution checking.
export default function ResourceOverview({
  title,
  subtitle,
  icon,
  essentials = [],
  table,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', ...(table ? [table.tabLabel ?? 'details'] : [])];

  return (
    <BladeShell title={title} subtitle={subtitle} icon={icon} width={620} onClose={onClose}>
      <div className="psb-commandbar">
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

      {tabs.length > 1 && (
        <div className="psb-wizard-tabs">
          {tabs.map(t => (
            <div
              key={t}
              className={`psb-wizard-tab${activeTab === t ? ' active' : ''}`}
              onClick={() => setActiveTab(t)}
              style={{ cursor: 'pointer' }}
            >
              <span className="psb-wizard-tab-label">{t === 'overview' ? 'Overview' : t}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="psb-essentials">
          {essentials.map(({ key, value }) => (
            <div className="psb-essential-row" key={key}>
              <span className="psb-essential-key">{key}</span>
              <span className="psb-essential-val">{value}</span>
            </div>
          ))}
        </div>
      )}

      {table && activeTab === (table.tabLabel ?? 'details') && (
        <div className="psb-overview-section">
          {table.description && <p className="psb-section-desc">{table.description}</p>}
          <table className="psb-table">
            <thead>
              <tr>
                {table.columns.map(c => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {table.rows.length === 0 ? (
                <tr>
                  <td colSpan={table.columns.length} style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '0.6rem 1rem' }}>
                    No data
                  </td>
                </tr>
              ) : (
                table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => <td key={j}>{cell}</td>)}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </BladeShell>
  );
}
