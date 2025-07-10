import React, { useState, useEffect, useCallback } from 'react';
import CandidateCard from './CandidateCard';

const ReferralDashboard = ({ onNavigateToForm }) => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filterCandidates = useCallback(() => {
    const filtered = candidates.filter(candidate => {
      const matchesSearch = candidate.CandidateName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesJobTitle = !jobTitleFilter || candidate.JobTitle === jobTitleFilter;
      const matchesStatus = !statusFilter || candidate.Status === statusFilter;

      return matchesSearch && matchesJobTitle && matchesStatus;
    });

    setFilteredCandidates(filtered);
  }, [candidates, searchTerm, jobTitleFilter, statusFilter]);

  useEffect(() => {
    filterCandidates();
  }, [filterCandidates]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://candidate-referral-management-system-m5yq.onrender.com/referral/candidates');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      showNotification('Failed to load candidates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateCandidateStatus = async (candidateId, newStatus) => {
    try {
      const response = await fetch(`https://candidate-referral-management-system-m5yq.onrender.com/referral/candidates/${candidateId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Status: newStatus })
      });

      if (response.ok) {
        setCandidates(prevCandidates =>
          prevCandidates.map(candidate =>
            candidate._id === candidateId
              ? { ...candidate, Status: newStatus }
              : candidate
          )
        );
        showNotification('Status updated successfully!', 'success');
      } else {
        showNotification('Failed to update status', 'error');
      }
    } catch (error) {
      showNotification('Network error. Please try again.', 'error');
    }
  };

  const deleteCandidate = async (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        const response = await fetch(`https://candidate-referral-management-system-m5yq.onrender.com/referral/candidates/${candidateId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setCandidates(prevCandidates =>
            prevCandidates.filter(candidate => candidate._id !== candidateId)
          );
          showNotification('Candidate deleted successfully!', 'success');
        } else {
          showNotification('Failed to delete candidate', 'error');
        }
      } catch (error) {
        showNotification('Network error. Please try again.', 'error');
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', show: false });
    }, 3000);
  };

  const getUniqueJobTitles = () => {
    return [...new Set(candidates.map(c => c.JobTitle))];
  };

  const getStats = () => {
    const total = candidates.length;
    const hired = candidates.filter(c => c.Status === 'hired').length;
    const reviewed = candidates.filter(c => c.Status === 'reviewed').length;
    const pending = candidates.filter(c => c.Status === 'pending').length;
    return { total, hired, reviewed, pending };
  };

  const stats = getStats();

  return (
    <div className="container">
      <div className="header">
        <h1>Candidate Referral Dashboard</h1>
        <p>Manage your candidate referrals efficiently</p>
        <button className="btn btn-primary" onClick={onNavigateToForm}>
          Add New Referral
        </button>
      </div>

      <div className="section">
        <h2>Quick Stats</h2>
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <h3>{stats.total}</h3>
            <p>Total Candidates</p>
          </div>
          <div className="stat-card stat-hired">
            <h3>{stats.hired}</h3>
            <p>Hired</p>
          </div>
          <div className="stat-card stat-reviewed">
            <h3>{stats.reviewed}</h3>
            <p>Reviewed</p>
          </div>
          <div className="stat-card stat-pending">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="section dashboard-section">
        <h2>All Candidates</h2>

        <div className="search-filters">
          <input
            type="text"
            placeholder="Search by candidate name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={jobTitleFilter}
            onChange={(e) => setJobTitleFilter(e.target.value)}
          >
            <option value="">All Job Titles</option>
            {getUniqueJobTitles().map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="hired">Hired</option>
          </select>
        </div>

        <div className="candidates-container">
          {loading ? (
            <div className="loading">Loading candidates...</div>
          ) : filteredCandidates.length === 0 ? (
            <div className="no-candidates">
              {candidates.length === 0
                ? "No candidates found. Start by referring your first candidate!"
                : "No candidates found matching your criteria."
              }
            </div>
          ) : (
            <div className="candidates-grid">
              {filteredCandidates.map(candidate => (
                <CandidateCard
                  key={candidate._id}
                  candidate={candidate}
                  onUpdateStatus={updateCandidateStatus}
                  onDeleteCandidate={deleteCandidate}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type} show`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ReferralDashboard;
