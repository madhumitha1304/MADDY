import React from 'react';
import API from '../services/api';

const TaskList = ({ tasks, onTaskUpdate }) => {
  if (!tasks || tasks.length === 0) return <div className="glass-card">No tasks assigned to this employee.</div>;

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/tasks/${id}/status`, { status });
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const creatorId = prompt('Enter Creator ID to confirm deletion (only creator can delete):');
      if (!creatorId) return;
      
      await API.delete(`/tasks/${taskId}?userId=${creatorId}`);
      if (onTaskUpdate) onTaskUpdate();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Delete failed. Only the creator can delete this task.');
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <div style={{ fontWeight: 600 }}>{task.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{task.description}</div>
              </td>
              <td>{task.dueDate || 'No date'}</td>
              <td>
                <span className={`badge badge-${task.status.toLowerCase()}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select 
                    value={task.status} 
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    style={{ padding: '0.25rem', fontSize: '0.75rem' }}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(task.id)} 
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
