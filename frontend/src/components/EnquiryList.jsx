import React from 'react';

export default function EnquiryList({ enquiries, canEdit, canDelete, onStatusChange, onDelete }) {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge badge-new';
      case 'In Progress': return 'badge badge-in-progress';
      case 'Closed': return 'badge badge-closed';
      default: return 'badge';
    }
  };

  return (
    <div className="card">
      <h3>Enquiry & Task Queue</h3>
      <div className="table-responsive">
        <table className="enquiry-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Category</th>
              <th>Assigned To</th>
              <th>Deadline</th>
              <th>Status</th>
              {(canEdit || canDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  No enquiries found matching your query.
                </td>
              </tr>
            ) : (
              enquiries.map((item) => (
                <tr key={item._id}>
                  <td className="client-info">
                    <strong>{item.clientName}</strong>
                    <small>{item.clientEmail}</small>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.assignedTo || 'Unassigned'}</td>
                  <td>{new Date(item.deadline).toLocaleDateString()}</td>
                  <td>
                    <span className={getBadgeClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td>
                      <div className="action-controls">
                        {canEdit && (
                          <select 
                            className="select-status"
                            value={item.status} 
                            onChange={(e) => onStatusChange(item._id, e.target.value)}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        )}
                        {canDelete && (
                          <button 
                            className="btn-delete"
                            onClick={() => onDelete(item._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}