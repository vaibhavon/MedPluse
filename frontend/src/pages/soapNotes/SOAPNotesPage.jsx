// src/soapNotes/SOAPNotesPage.jsx

import { useState } from "react";
import { initialSoapNotes } from "./soapNotesData";
import "./soapNotes.css";

export default function SOAPNotesPage() {
  const [notes, setNotes] = useState(initialSoapNotes);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  };

  const [form, setForm] = useState(emptyForm);

  // ========================
  // Handlers
  // ========================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.subjective || !form.assessment) {
      alert("Subjective and Assessment are required");
      return;
    }

    // ✏️ EDIT MODE
    if (editingId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingId
            ? { ...n, ...form }
            : n
        )
      );
      setEditingId(null);
    } else {
      // ➕ CREATE MODE
      const newNote = {
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        doctor: "Dr. Anjali Sharma",
        ...form
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    setForm(emptyForm);
  };

  const handleEdit = (note) => {
    setForm({
      subjective: note.subjective,
      objective: note.objective,
      assessment: note.assessment,
      plan: note.plan
    });
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this note?")) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  // ========================
  // UI
  // ========================

  return (
    <div className="soap-page">
      <h1>SOAP Notes</h1>

      {/* ================= EDITOR ================= */}
      <div className="soap-editor">
        <Section
          title="Subjective (S)"
          name="subjective"
          value={form.subjective}
          onChange={handleChange}
          placeholder="Patient symptoms, complaints..."
        />

        <Section
          title="Objective (O)"
          name="objective"
          value={form.objective}
          onChange={handleChange}
          placeholder="Vitals, exam findings..."
        />

        <Section
          title="Assessment (A)"
          name="assessment"
          value={form.assessment}
          onChange={handleChange}
          placeholder="Clinical diagnosis..."
        />

        <Section
          title="Plan (P)"
          name="plan"
          value={form.plan}
          onChange={handleChange}
          placeholder="Treatment plan..."
        />

        <div className="editor-actions">
          {editingId && (
            <button className="btn-cancel" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}

          <button className="btn-save" onClick={handleSave}>
            {editingId ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>

      {/* ================= HISTORY ================= */}
      <div className="soap-history">
        <h2>Previous Notes</h2>

        {notes.length === 0 && (
          <div className="empty">No notes yet</div>
        )}

        {notes.map((n) => (
          <div key={n.id} className="soap-card">
            <div className="soap-meta">
              <strong>{n.doctor}</strong>
              <span>{n.date}</span>
            </div>

            <Block title="S" text={n.subjective} />
            <Block title="O" text={n.objective} />
            <Block title="A" text={n.assessment} />
            <Block title="P" text={n.plan} />

            <div className="card-actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(n)}
              >
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(n.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================
// Reusable Components
// ========================

function Section({ title, name, value, onChange, placeholder }) {
  return (
    <div className="soap-section">
      <label>{title}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function Block({ title, text }) {
  if (!text) return null;
  return (
    <p className="soap-block">
      <strong>{title}:</strong> {text}
    </p>
  );
}