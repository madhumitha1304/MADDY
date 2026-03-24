import React, { useState, useEffect } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import API from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/employees');
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="gradient-text">Manage Employees</h2>
        <p style={{ color: 'var(--text-muted)' }}>Create and view organization members.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>
        <div>
          <EmployeeForm onEmployeeAdded={fetchEmployees} />
        </div>
        <div>
          <EmployeeList employees={employees} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Employees;
