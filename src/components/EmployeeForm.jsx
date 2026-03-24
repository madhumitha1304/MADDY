import React, { useState } from 'react';
import API from '../services/api';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.department) {
      setMessage({ text: 'Please fill in all fields', type: 'danger' });
      return;
    }

    setLoading(true);
    try {
      await API.post('/employees', formData);
      setMessage({ text: 'Employee created successfully!', type: 'success' });
      setFormData({ name: '', email: '', department: '' });
      if (onEmployeeAdded) onEmployeeAdded();
    } catch (error) {
      console.error('Error creating employee:', error);
      setMessage({ text: 'Failed to create employee.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card animate-fade-in">
      <h3>Add New Employee</h3>
      {message.text && (
        <div style={{ padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', 
                      background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
                      border: `1px solid ${message.type === 'success' ? 'var(--success)' : 'var(--danger)'}` }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            placeholder="e.g. Engineering"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Employee'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
