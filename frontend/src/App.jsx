import React, { useState, useEffect } from 'react';
import { fetchEnquiries, createEnquiry, updateEnquiry, deleteEnquiry } from './api';
import EnquiryForm from './components/EnquiryForm';
import EnquiryList from './components/EnquiryList';
import Login from './components/Login';
import AccountSettings from './components/AccountSettings';

export default function App() {
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // 1. Tracks current active page view ('dashboard' vs 'settings')
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const loadEnquiries = async () => {
    try {
      const res = await fetchEnquiries(search, statusFilter);
      setEnquiries(res.data.data);
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    }
  };

  useEffect(() => {
    if (user && currentView === 'dashboard') loadEnquiries();
  }, [user, search, statusFilter, currentView]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  const canLogEnquiries = user.role === 'Designer' || user.role === 'Admin';
  const canDeleteEnquiries = user.role === 'Admin';

  return (
    <div className="app-container">
      {/* Brand Header */}
      <header className="app-header">
        <div className="brand-wrapper">
          <img src="/solaroot.jpg" alt="Solaroot Logo" style={{ height: '40px', width: 'auto' }} />
          <div>
            <h1>Solaroot Engineering Services Pvt. Ltd.</h1>
            <p>Client Enquiry & Task Tracking Portal</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="header-badge">
            👤 {user.name} ({user.role})
          </div>

          {/* Toggle between Dashboard and Settings views */}
          {currentView === 'dashboard' ? (
            <button 
              onClick={() => setCurrentView('settings')} 
              className="btn-delete" 
              style={{ background: '#e0f2fe', color: '#0369a1', padding: '8px 16px', borderRadius: '20px' }}
            >
              ⚙️ Settings
            </button>
          ) : (
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className="btn-delete" 
              style={{ background: '#0284c7', color: '#ffffff', padding: '8px 16px', borderRadius: '20px' }}
            >
              ← Back to Dashboard
            </button>
          )}

          <button 
            onClick={handleLogout} 
            className="btn-delete" 
            style={{ padding: '8px 16px', borderRadius: '20px' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* 2. Conditionally Render Either the Settings Page OR the Main Dashboard Page */}
      {currentView === 'settings' ? (
        <AccountSettings 
          user={user} 
          onAccountDeleted={handleLogout} 
          onClose={() => setCurrentView('dashboard')} 
        />
      ) : (
        <>
          {/* Form Display based on role permissions */}
          {canLogEnquiries ? (
            <EnquiryForm onEnquiryAdded={async (data) => {
              await createEnquiry(data);
              loadEnquiries();
            }} />
          ) : (
            <div className="card" style={{ background: '#f8fafc', borderStyle: 'dashed', textAlign: 'center', color: '#64748b' }}>
              <p>ℹ️ <strong>View-Only Access:</strong> Your role (<code>{user.role}</code>) allows reading the enquiry queue only.</p>
            </div>
          )}

          {/* Controls & Search Bar */}
          <div className="controls-bar">
            <input 
              type="text" 
              className="form-control search-input"
              placeholder="🔍 Search by client name, designer, or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select 
              className="form-control filter-select"
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Main Queue List */}
          <EnquiryList 
            enquiries={enquiries} 
            canEdit={canLogEnquiries}
            canDelete={canDeleteEnquiries}
            onStatusChange={async (id, status) => {
              await updateEnquiry(id, { status });
              loadEnquiries();
            }} 
            onDelete={async (id) => {
              if (window.confirm('Delete this enquiry record?')) {
                await deleteEnquiry(id);
                loadEnquiries();
              }
            }} 
          />
        </>
      )}
    </div>
  );
}