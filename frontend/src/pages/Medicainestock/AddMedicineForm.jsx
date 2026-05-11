import { useState } from "react";
import "./AddMedicineForm.css"; // Don't forget to import the CSS!

function AddMedicineForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiry: "",
    supplier: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return alert("Medicine name required");

    onAdd({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price)
    });

    setForm({
      name: "",
      category: "",
      quantity: "",
      price: "",
      expiry: "",
      supplier: ""
    });
  };

  return (
    <form className="add-medicine-form" onSubmit={handleSubmit}>
      <h3>➕ Add New Medicine</h3>

      <div className="form-grid">
        <input 
          name="name" 
          placeholder="Medicine Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          name="category" 
          placeholder="Category (e.g., Tablet, Syrup)" 
          value={form.category} 
          onChange={handleChange} 
        />
        
        <input 
          name="quantity" 
          type="number" 
          placeholder="Quantity" 
          value={form.quantity} 
          onChange={handleChange} 
        />
        
        <input 
          name="price" 
          type="number" 
          placeholder="Price (₹)" 
          value={form.price} 
          onChange={handleChange} 
        />
        
        <div className="input-group">
          <label>Expiry Date</label>
          <input 
            name="expiry" 
            type="date" 
            value={form.expiry} 
            onChange={handleChange} 
          />
        </div>

        <input 
          name="supplier" 
          placeholder="Supplier Name" 
          value={form.supplier} 
          onChange={handleChange} 
        />
      </div>

      <button type="submit" className="add-btn">Add to Stock</button>
    </form>
  );
}

export default AddMedicineForm;