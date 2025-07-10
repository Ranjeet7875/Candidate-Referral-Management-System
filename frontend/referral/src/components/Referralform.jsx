import React, { useState } from 'react';

const ReferralForm = ({ onNavigateBack }) => {
  const [form, setForm] = useState({
    CandidateName: '',
    Email: '',
    PhoneNumber: '',
    JobTitle: '',
    Status: 'pending',
    ResumeURL: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setForm({ ...form, ResumeURL: `uploads/${file.name}` });
    } else if (file) {
      showNotification('Please select a PDF file only', 'error');
      e.target.value = '';
    }
  };

  const validateForm = () => {
    if (!form.CandidateName.trim()) {
      showNotification('Candidate name is required', 'error');
      return false;
    }
    if (!form.Email.trim()) {
      showNotification('Email is required', 'error');
      return false;
    }
    if (!form.PhoneNumber.trim()) {
      showNotification('Phone number is required', 'error');
      return false;
    }
    if (!form.JobTitle.trim()) {
      showNotification('Job title is required', 'error');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.Email)) {
      showNotification('Please enter a valid email address', 'error');
      return false;
    }
    
    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.PhoneNumber.replace(/\D/g, ''))) {
      showNotification('Please enter a valid 10-digit phone number', 'error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:4000/referral/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        showNotification('Candidate referred successfully!', 'success');
        // Reset form
        setForm({
          CandidateName: '',
          Email: '',
          PhoneNumber: '',
          JobTitle: '',
          Status: 'pending',
          ResumeURL: ''
        });
        setResumeFile(null);
        document.getElementById('resumeFile').value = '';
        
        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          onNavigateBack();
        }, 2000);
      } else {
        const error = await response.json();
        showNotification(error.error || 'Failed to submit referral', 'error');
      }
    } catch (error) {
      showNotification('Network error. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', show: false });
    }, 3000);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Refer a New Candidate</h1>
        <p>Fill in the candidate details below</p>
        <button className="btn btn-secondary" onClick={onNavigateBack}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="form-container">
        <div className="section">
          <h2>Candidate Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="candidateName">Candidate Name *</label>
              <input
                type="text"
                id="candidateName"
                name="CandidateName"
                value={form.CandidateName}
                onChange={handleFormChange}
                required
                placeholder="Enter candidate's full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="Email"
                value={form.Email}
                onChange={handleFormChange}
                required
                placeholder="Enter candidate's email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="PhoneNumber"
                value={form.PhoneNumber}
                onChange={handleFormChange}
                pattern="[0-9]{10}"
                required
                placeholder="Enter 10-digit phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job Title *</label>
              <input
                type="text"
                id="jobTitle"
                name="JobTitle"
                value={form.JobTitle}
                onChange={handleFormChange}
                required
                placeholder="Enter the position they're applying for"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resumeFile">Resume (PDF only)</label>
              <input
                type="file"
                id="resumeFile"
                accept=".pdf"
                onChange={handleFileChange}
              />
              {resumeFile && (
                <p className="file-info">Selected: {resumeFile.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="Status"
                value={form.Status}
                onChange={handleFormChange}
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="hired">Hired</option>
              </select>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Referral'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onNavigateBack}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type} show`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ReferralForm;