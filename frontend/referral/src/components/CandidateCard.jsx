import React from 'react';

const CandidateCard = ({ candidate, onUpdateStatus, onDeleteCandidate }) => {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onUpdateStatus(candidate._id, newStatus);
  };

  const handleDelete = () => {
    onDeleteCandidate(candidate._id);
  };

  return (
    <div className="candidate-card">
      <div className="candidate-header">
        <div className="candidate-name">{candidate.CandidateName}</div>
        <div className={`status-badge status-${candidate.Status}`}>
          {candidate.Status}
        </div>
      </div>
      
      <div className="candidate-details">
        <p><strong>Job Title:</strong> {candidate.JobTitle}</p>
        <p><strong>Email:</strong> {candidate.Email}</p>
        <p><strong>Phone:</strong> {candidate.PhoneNumber}</p>
      </div>
      
      <div className="candidate-actions">
        <div className="status-update">
          <label>Update Status:</label>
          <select
            value={candidate.Status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="hired">Hired</option>
          </select>
        </div>
        <button
          className="btn btn-small btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;