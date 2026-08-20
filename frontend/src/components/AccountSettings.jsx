import React, { useState } from 'react';
import { changePassword, deleteAccount } from '../api';

export default function AccountSettings({ user, onAccountDeleted, onClose }) {
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    try {
      const res = await changePassword(passwordData);
      if (res.data.success) {
        setMsg({ type: 'success', text: 'Password changed successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to change password' });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to permanently delete your account? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteAccount();
      if (res.data.success) {
        alert('Your account has been deleted.');
        onAccountDeleted();
      }
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to delete account' });
    }
  };

  return (
    <div className="card" style={{ marginTop: '20px', border: '1px solid #cbd5e1' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>⚙️ Account Settings ({user.name})</h3>
        <button className="btn-delete" style={{ background: '#e2e8f0', color: '#334155' }} onClick={onClose}>
          ✕ Close
        </button>
      </div>

      {msg.text && (
        <div style={{
          background: msg.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: msg.type === 'success' ? '#15803d' : '#991b1b',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '16px'
        }}>
          {msg.text}
        </div>
      )}

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange} className="enquiry-form-grid" style={{ marginBottom: '24px' }}>
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input 
            type="password" 
            className="form-control" 
            required 
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input 
            type="password" 
            className="form-control" 
            required 
            minLength={6}
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ gridColumn: 'span 2' }}>
          Update Password
        </button>
      </form>

      <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

      {/* Delete Account Danger Zone */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ fontSize: '14px', color: '#991b1b', fontWeight: '700' }}>Danger Zone</h4>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Permanently remove your staff access account.</p>
        </div>
        <button onClick={handleDeleteAccount} className="btn-delete" style={{ padding: '8px 16px' }}>
          Delete Account
        </button>
      </div>
    </div>
  );
}