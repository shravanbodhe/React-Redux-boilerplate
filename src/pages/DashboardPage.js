import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMeQuery, useLogoutMutation } from '../services/authApi';

function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const { isLoading: isCheckingSession, isError } = useGetMeQuery();
  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (isCheckingSession) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          style={{ marginRight: '10px' }}
        >
          Home
        </button>
        <button type="button" onClick={() => setActiveTab('about')}>
          About Us
        </button>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          style={{ marginLeft: '10px' }}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      {activeTab === 'home' && (
        <div>
          <h3>Home</h3>
          <p>Welcome to the dashboard.</p>
        </div>
      )}

      {activeTab === 'about' && (
        <div>
          <h3>About Us</h3>
          <p>This is the about us tab.</p>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
