import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quickActions, setQuickActions] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    activeTrips: 0,
    pendingExpenses: 0,
    alerts: 0,
    esgScore: 0,
    co2ThisMonth: 0,
    budgetUsed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📦 Dashboard data:", res.data);

        setQuickActions(res.data.quickActions || []);
        setRecentActivity(res.data.recentActivity || []);
        setStats(res.data.stats || {});
      } catch (err) {
        console.error("Error fetching dashboard data:", err.response?.data || err.message);

        // If token is invalid or expired
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1 className="page-title">Welcome back, {user?.name}!</h1>
        <p className="dashboard-subtitle">Manage your travel requests and expenses</p>
      </div>

      <div className="dashboard-grid">
        {/* ✅ Quick Actions */}
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

        {/* ✅ Recent Activity */}
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

        {/* ✅ Stats Overview */}
        <section className="stats-overview">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.activeTrips}</h3>
              <p>Active Trips</p>
            </div>
            <div className="stat-card">
              <h3>${stats.pendingExpenses}</h3>
              <p>Pending Expenses</p>
            </div>
            <div className="stat-card">
              <h3>{stats.alerts}</h3>
              <p>Alerts</p>
            </div>
            <div className="stat-card">
              <h3>{stats.esgScore}</h3>
              <p>ESG Score</p>
            </div>
            <div className="stat-card">
              <h3>{stats.co2ThisMonth} kg</h3>
              <p>CO₂ This Month</p>
            </div>
            <div className="stat-card">
              <h3>${stats.budgetUsed}</h3>
              <p>Budget Used</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
