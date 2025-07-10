import React, { useState } from 'react';
import './App.css';
import ReferralDashboard from './components/ReferralDashboard';
import ReferralForm from './components/ReferralForm';

function App() {
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
}

export default App;