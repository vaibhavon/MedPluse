
import "./MachineForm.css"

import { useEffect, useState } from "react";

function MachineForm({ onAddMachine, editingMachine, onUpdateMachine }) {
  const [formData, setFormData] = useState({
    name: "",
    ward: "",
    status: "Working",
    lastService: ""
  });

  // 🔥 fill form when editing
  useEffect(() => {
    if (editingMachine) {
      setFormData(editingMachine);
    }
  }, [editingMachine]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMachine) {
      onUpdateMachine(formData);
    } else {
      onAddMachine({
        id: Date.now(),
        ...formData
      });
    }

    setFormData({
      name: "",
      ward: "",
      status: "Working",
      lastService: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="machine-form">
      <h3>{editingMachine ? "Edit Machine" : "Add Machine"}</h3>

      <input
        type="text"
        name="name"
        placeholder="Machine Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="ward"
        placeholder="Ward"
        value={formData.ward}
        onChange={handleChange}
        required
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Working">Working</option>
        <option value="Maintenance Due">Maintenance Due</option>
      </select>

      <input
        type="date"
        name="lastService"
        value={formData.lastService}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingMachine ? "Update Machine" : "Add Machine"}
      </button>
    </form>
  );
}

export default MachineForm;
