import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    { title: 'New Trip Request', path: '/trip-request', icon: '✈️', color: '#3498db' },
    { title: 'View Itinerary', path: '/itinerary', icon: '📋', color: '#27ae60' },
    { title: 'Safety Checklist', path: '/safety', icon: '✅', color: '#f39c12' },
    { title: 'Upload Expenses', path: '/expenses', icon: '💰', color: '#9b59b6' },
    { title: 'ESG Tracking', path: '/esg-tracking', icon: '🌱', color: '#10b981' },
    { title: 'Trip History', path: '/trip-history', icon: '📊', color: '#8b5cf6' }
  ];

  const recentActivity = [
    { action: 'Trip to New York approved', date: '2 days ago', status: 'approved' },
    { action: 'Expense receipt uploaded', date: '3 days ago', status: 'pending' },
    { action: 'Safety checklist completed', date: '1 week ago', status: 'completed' }
  ];

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1 className="page-title">Welcome back, {user?.name}!</h1>
        <p className="dashboard-subtitle">Manage your travel requests and expenses</p>
      </div>

      <div className="dashboard-grid">
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="action-card"
                style={{ borderLeftColor: action.color }}
              >
                <span className="action-icon">{action.icon}</span>
                <span className="action-title">{action.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-content">
                  <p className="activity-action">{item.action}</p>
                  <span className="activity-date">{item.date}</span>
                </div>
                <span className={`activity-status ${item.status}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-overview">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>3</h3>
              <p>Active Trips</p>
            </div>
            <div className="stat-card">
              <h3>$1,250</h3>
              <p>Pending Expenses</p>
            </div>
            <div className="stat-card">
              <h3>2</h3>
              <p>Alerts</p>
            </div>
            <div className="stat-card">
              <h3>72</h3>
              <p>ESG Score</p>
            </div>
            <div className="stat-card">
              <h3>245 kg</h3>
              <p>CO₂ This Month</p>
            </div>
            <div className="stat-card">
              <h3>$8,450</h3>
              <p>Budget Used</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;