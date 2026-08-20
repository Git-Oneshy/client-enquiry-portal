import React, { useState } from 'react';

export default function EnquiryForm({ onEnquiryAdded }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    category: 'Permit Design',
    description: '',
    assignedTo: '',
    deadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.deadline) return;
    await onEnquiryAdded(formData);
    setFormData({
      clientName: '',
      clientEmail: '',
      category: 'Permit Design',
      description: '',
      assignedTo: '',
      deadline: ''
    });
  };

  return (
    <div className="card">
      <h3>➕ Log New Client Enquiry</h3>
      <form onSubmit={handleSubmit} className="enquiry-form-grid">
        <div className="form-group">
          <label className="form-label">Client / Company Name</label>
          <input 
            type="text" 
            className="form-control"
            placeholder="e.g. Apex Solar Ltd" 
            value={formData.clientName} 
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Client Email</label>
          <input 
            type="email" 
            className="form-control"
            placeholder="e.g. client@apex.com" 
            value={formData.clientEmail} 
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Service Category</label>
          <select 
            className="form-control"
            value={formData.category} 
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Permit Design">Permit Design</option>
            <option value="Revisions">Revisions</option>
            <option value="EPC Support">EPC Support</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Assigned Designer</label>
          <input 
            type="text" 
            className="form-control"
            placeholder="e.g. M. Sharma" 
            value={formData.assignedTo} 
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} 
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Target Deadline</label>
          <input 
            type="date" 
            className="form-control"
            value={formData.deadline} 
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} 
            required 
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Project Scope / Details</label>
          <textarea 
            className="form-control"
            placeholder="Enter job details or permit requirements..." 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            required 
          />
        </div>
        <button type="submit" className="btn-primary">
          <span>Submit Client Enquiry</span> ➔
        </button>
      </form>
    </div>
  );
}