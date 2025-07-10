import React from 'react';
import { useState } from 'react';
import ReferralDashboard from '../components/ReferralDashboard';
import ReferralForm from '../components/Referralform';
import "../App.css"

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <ReferralDashboard onNavigateToForm={() => setCurrentPage('form')} />;
      case 'form':
        return <ReferralForm onNavigateBack={() => setCurrentPage('dashboard')} />;
      default:
        return <ReferralDashboard onNavigateToForm={() => setCurrentPage('form')} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  );
};

export default Dashboard;
