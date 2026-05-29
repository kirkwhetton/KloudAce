import BladeShell from '../BladeShell';

const EXISTING_RGS = [
  { name: 'rg-dev-westus2',    subscription: 'Dev / Test',   location: 'West US 2' },
  { name: 'rg-infra-eastus',   subscription: 'Production',   location: 'East US'   },
  { name: 'rg-monitoring',     subscription: 'Production',   location: 'East US 2' },
];

export default function ResourceGroupList({ onOpen, onClose, completed }) {
  return (
    <BladeShell title="Resource groups" width={700} onClose={onClose}>
      {/* Command bar */}
      <div className="psb-commandbar">
        <button
          className="psb-cmd psb-cmd--primary"
          onClick={() => onOpen('rg-create')}
          disabled={completed}
        >
          <span className="psb-cmd-icon">＋</span> Create
        </button>
        <button className="psb-cmd" disabled>
          <span className="psb-cmd-icon">🗑</span> Delete
        </button>
        <button className="psb-cmd">
          <span className="psb-cmd-icon">↻</span> Refresh
        </button>
        <button className="psb-cmd">
          <span className="psb-cmd-icon">⊞</span> Manage view
        </button>
      </div>

      {/* Filter row */}
      <div className="psb-filterbar">
        <input className="psb-filter-input" placeholder="Filter by name…" />
        <select className="psb-filter-select"><option>Subscription == all</option></select>
        <select className="psb-filter-select"><option>Location == all</option></select>
        <button className="psb-cmd psb-cmd--sm">⊕ Add filter</button>
      </div>

      {/* Table */}
      <table className="psb-table">
        <thead>
          <tr>
            <th style={{ width: 24 }}><input type="checkbox" /></th>
            <th>Name ↑</th>
            <th>Subscription</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {EXISTING_RGS.map(rg => (
            <tr key={rg.name}>
              <td><input type="checkbox" /></td>
              <td><button className="psb-link">{rg.name}</button></td>
              <td>{rg.subscription}</td>
              <td>{rg.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="psb-table-footer">Showing 1 to {EXISTING_RGS.length} of {EXISTING_RGS.length} records</p>
    </BladeShell>
  );
}
