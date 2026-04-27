import React, { useState } from 'react';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');

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
        <button
          type="button"
          onClick={() => setActiveTab('about')}
        >
          About Us
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
