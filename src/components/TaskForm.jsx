import React, { useState, useEffect } from 'react';
import API from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedId: '',
    createdId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data } = await API.get('/employees');
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.assignedId || !formData.createdId) {
      setMessage({ text: 'Please fill in required fields', type: 'danger' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        task: {
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate || null,
          status: 'TODO'
        },
        assignedId: Number(formData.assignedId),
        createdId: Number(formData.createdId)
      };

      await API.post('/tasks', payload);

      setMessage({ text: 'Task assigned successfully!', type: 'success' });
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        assignedId: '',
        createdId: ''
      });
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage({
        text: error?.response?.data?.error || 'Failed to create task.',
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card animate-fade-in">
      <h3>Assign New Task</h3>

      {message.text && (
        <div
          style={{
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            background:
              message.type === 'success'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(239, 68, 68, 0.1)',
            color:
              message.type === 'success'
                ? 'var(--success)'
                : 'var(--danger)',
            border: `1px solid ${message.type === 'success'
                ? 'var(--success)'
                : 'var(--danger)'
              }`
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title *</label>
          <input
            type="text"
            placeholder="e.g. Design Login Page"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Detailed task description..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Assigned To *</label>
            <select
              value={formData.assignedId}
              onChange={(e) =>
                setFormData({ ...formData, assignedId: e.target.value })
              }
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Created By *</label>
            <select
              value={formData.createdId}
              onChange={(e) =>
                setFormData({ ...formData, createdId: e.target.value })
              }
              required
            >
              <option value="">Select Creator</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Assigning...' : 'Assign Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;