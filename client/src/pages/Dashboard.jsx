import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>
          Welcome to MindCare Dashboard
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          You are successfully logged in!
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#f0f0f0',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Total Sessions</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>0</p>
          </div>
          
          <div style={{
            background: '#f0f0f0',
            padding: '1.5rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Minutes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2' }}>0</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;