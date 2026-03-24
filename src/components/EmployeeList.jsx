import React from 'react';

const EmployeeList = ({ employees, loading }) => {
  if (loading) return <div className="glass-card">Loading employees...</div>;
  if (!employees || employees.length === 0) return <div className="glass-card">No employees found.</div>;

  return (
    <div className="glass-card animate-fade-in" style={{ marginTop: '2rem' }}>
      <h3>Employee List</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td style={{ fontWeight: 500 }}>{emp.name}</td>
                <td style={{ color: 'var(--text-muted)' }}>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
