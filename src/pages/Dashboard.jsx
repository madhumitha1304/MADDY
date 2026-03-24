import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Task Tracker</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Efficiently manage your employees and track task progress in real-time.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>👥</div>
          <h3>Employee Management</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Add new employees to your organization and view the complete database.
          </p>
          <Link to="/employees" className="btn btn-primary" style={{ marginTop: 'auto', textDecoration: 'none' }}>
            Go to Employees
          </Link>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>📋</div>
          <h3>Task Assignments</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Create tasks, assign them to employees, and monitor their status from TODO to DONE.
          </p>
          <Link to="/tasks" className="btn btn-primary" style={{ marginTop: 'auto', textDecoration: 'none', background: 'var(--secondary)' }}>
            Go to Tasks
          </Link>
        </div>

        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>⚡</div>
          <h3>System Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></span>
            Connected to 127.0.0.1:8081
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            All systems operational. Data is synchronized with the backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
