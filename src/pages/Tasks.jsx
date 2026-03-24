import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import API from '../services/api';

const Tasks = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

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

  const fetchTasks = async (empId) => {
    if (!empId) {
      setTasks([]);
      return;
    }
    setLoadingTasks(true);
    try {
      const { data } = await API.get(`/tasks/employee/${empId}`);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setTasks([]);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleEmployeeChange = (e) => {
    const id = e.target.value;
    setSelectedEmployeeId(id);
    fetchTasks(id);
  };

  const handleTaskUpdate = () => {
    fetchTasks(selectedEmployeeId);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="gradient-text">Task Management</h2>
        <p style={{ color: 'var(--text-muted)' }}>Assign tasks and track status by employee.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <TaskForm onTaskCreated={handleTaskUpdate} />
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>View Tasks by Employee</h3>
            <select 
              value={selectedEmployeeId} 
              onChange={handleEmployeeChange}
              style={{ width: 'auto' }}
            >
              <option value="">Select an employee...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          {loadingTasks ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>
          ) : (
            <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
