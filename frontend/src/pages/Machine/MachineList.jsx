import { useState, useMemo } from "react";
import MachineCard from "./MachineCard";
import MachineForm from "./MachineForm";
import { machinesData } from "./machineData";
import "./MachineList.css"

function MachineList() {
  const [machines, setMachines] = useState(machinesData);
  const [editingMachine, setEditingMachine] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // ✅ ADD
  const handleAddMachine = (machine) => {
    setMachines((prev) => [...prev, machine]);
  };

  // ✅ DELETE
  const handleDeleteMachine = (id) => {
    setMachines((prev) => prev.filter((m) => m.id !== id));
  };

  // ✅ EDIT start
  const handleEditMachine = (machine) => {
    setEditingMachine(machine);
  };

  // ✅ UPDATE
  const handleUpdateMachine = (updatedMachine) => {
    setMachines((prev) =>
      prev.map((m) => (m.id === updatedMachine.id ? updatedMachine : m))
    );
    setEditingMachine(null);
  };

  // 🔍 SEARCH + FILTER (SUPER IMPORTANT)
  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      const matchSearch = m.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "All" || m.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [machines, search, filterStatus]);
return (
    <div className="machine-container">
      <header className="machine-list-header">
        <h2>Machine Management</h2>
      </header>

      <div className="controls-bar">
        <input
          type="text"
          placeholder="🔍 Search machines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Working">✅ Working</option>
          <option value="Maintenance Due">⚠️ Maintenance Due</option>
        </select>
      </div>

      <main className="main-content">
        <aside className="form-sidebar">
          <MachineForm
            onAddMachine={handleAddMachine}
            editingMachine={editingMachine}
            onUpdateMachine={handleUpdateMachine}
          />
        </aside>

        <section className="machine-grid">
          {filteredMachines.length > 0 ? (
            filteredMachines.map((machine) => (
              <MachineCard
                key={machine.id}
                machine={machine}
                onDelete={handleDeleteMachine}
                onEdit={handleEditMachine}
              />
            ))
          ) : (
            <div className="no-results">No machines found matching your criteria.</div>
          )}
        </section>
      </main>
    </div>
  );
  
  
}

export default MachineList;
