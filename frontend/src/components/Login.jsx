import React, { useState } from 'react';
import { login, register } from '../api';

export default function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Viewer' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = isRegister 
        ? await register(formData) 
        : await login({ email: formData.email, password: formData.password });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onLoginSuccess(res.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: '420px', marginTop: '60px' }}>
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="public/solaroot.jpg" alt="Solaroot Logo" className="brand-logo" />
          {/* <div className="brand-logo" style={{ margin: '0 auto 12px auto' }}>⚡</div> */}
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Solaroot Enquiry Portal</h2>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            {isRegister ? 'Create an staff account' : 'Sign in to access client tracking'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="enquiry-form-grid" style={{ gridTemplateColumns: '1fr' }}>
          {isRegister && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select 
                  className="form-control" 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Viewer">Viewer (View-Only Queue)</option>
                  <option value="Designer">Designer (View & Log Enquiries)</option>
                  <option value="Admin">Admin (Full Control)</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ gridColumn: 'span 1', marginTop: '10px' }}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '16px', color: '#64748b' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span 
            onClick={() => setIsRegister(!isRegister)} 
            style={{ color: '#0284c7', fontWeight: '700', cursor: 'pointer' }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}