import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Tasks from './pages/Tasks';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="container">
      <Link to="/" className="logo">
        <span style={{ color: 'var(--primary)' }}>Task</span>Tracker
      </Link>
      <div className="links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
        <Link to="/employees" className={location.pathname === '/employees' ? 'active' : ''}>Employees</Link>
        <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>Tasks</Link>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
        
        <footer className="container" style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p>&copy; 2026 Task Assignment & Tracking System. Built with React & Axios.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
