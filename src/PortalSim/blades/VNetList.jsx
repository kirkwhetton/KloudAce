import BladeShell from '../BladeShell';

const EXISTING_VNETS = [
  { name: 'vnet-hub-westus2',  rg: 'rg-networking',      location: 'West US 2', space: '10.0.0.0/16' },
  { name: 'vnet-spoke-eastus', rg: 'rg-workloads-prod',  location: 'East US',   space: '10.10.0.0/16' },
  { name: 'vnet-mgmt-westus2', rg: 'rg-management',      location: 'West US 2', space: '10.20.0.0/16' },
];

export default function VNetList({ onOpen, onClose, completed }) {
  return (
    <BladeShell title="Virtual networks" width={780} onClose={onClose}>
      <div className="psb-commandbar">
        <button className="psb-cmd psb-cmd--primary" onClick={() => onOpen('vnet-create')} disabled={completed}>
          <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          Create
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
        <button className="psb-cmd">
          <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" aria-hidden="true">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          Manage view
        </button>
      </div>

      <div className="psb-filterbar">
        <input className="psb-filter-input" placeholder="Filter by name…" readOnly />
        <select className="psb-filter-select"><option>Subscription == all</option></select>
        <select className="psb-filter-select"><option>Resource group == all</option></select>
        <select className="psb-filter-select"><option>Location == all</option></select>
        <button className="psb-cmd psb-cmd--sm">⊕ Add filter</button>
      </div>

      <table className="psb-table">
        <thead>
          <tr>
            <th style={{ width: 24 }}><input type="checkbox" /></th>
            <th>Name ↑</th>
            <th>Resource group</th>
            <th>Location</th>
            <th>Address space</th>
            <th>DNS servers</th>
          </tr>
        </thead>
        <tbody>
          {EXISTING_VNETS.map(v => (
            <tr key={v.name}>
              <td><input type="checkbox" /></td>
              <td><button className="psb-link">{v.name}</button></td>
              <td>{v.rg}</td>
              <td>{v.location}</td>
              <td>{v.space}</td>
              <td>Default (Azure-provided)</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="psb-table-footer">Showing 1 to {EXISTING_VNETS.length} of {EXISTING_VNETS.length} records</p>
    </BladeShell>
  );
}
