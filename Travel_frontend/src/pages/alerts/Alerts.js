import React, { useState, useEffect } from 'react';
import './Alerts.css';

const Alerts = () => {
  const [newAlert, setNewAlert] = useState('');
  const [checkIns, setCheckIns] = useState([]);
  const [sosLog, setSosLog] = useState([]);
  const [lastCheckIn, setLastCheckIn] = useState('Never');
  
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'urgent',
      title: 'Flight Delay Alert',
      message: 'Your flight AA123 is delayed by 2 hours due to weather conditions',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Card Expiry Warning',
      message: 'Your corporate credit card expires in 30 days. Please contact HR for renewal.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'info',
      title: 'Weather Update',
      message: 'Rain expected at your destination tomorrow. Pack accordingly.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'success',
      title: 'Trip Approved',
      message: 'Your trip request to New York has been approved by your manager.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      read: true,
      actionRequired: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedCheckIns = localStorage.getItem('checkIns');
    const savedSOS = localStorage.getItem('sosLog');
    const savedLastCheckIn = localStorage.getItem('lastCheckIn');
    
    if (savedCheckIns) setCheckIns(JSON.parse(savedCheckIns));
    if (savedSOS) setSosLog(JSON.parse(savedSOS));
    if (savedLastCheckIn) setLastCheckIn(savedLastCheckIn);
  }, []);

  const addAlert = () => {
    if (!newAlert.trim()) return;
    
    const newAlertObj = {
      id: Date.now().toString(),
      type: 'info',
      title: 'Custom Alert',
      message: newAlert,
      timestamp: new Date(),
      read: false,
      actionRequired: false
    };
    
    setAlerts([newAlertObj, ...alerts]);
    setNewAlert('');
  };

  const handleCheckIn = () => {
    const timestamp = new Date();
    const checkInEntry = {
      time: timestamp.toLocaleString(),
      location: 'Current Location', // Can be enhanced with geolocation
      status: 'safe'
    };
    
    const updatedCheckIns = [checkInEntry, ...checkIns];
    setCheckIns(updatedCheckIns);
    setLastCheckIn(timestamp.toLocaleString());
    
    localStorage.setItem('checkIns', JSON.stringify(updatedCheckIns));
    localStorage.setItem('lastCheckIn', timestamp.toLocaleString());
    
    // Add success alert
    const successAlert = {
      id: Date.now().toString(),
      type: 'success',
      title: 'Check-in Successful',
      message: 'Your safe location has been recorded and shared with your team.',
      timestamp: timestamp,
      read: false,
      actionRequired: false
    };
    setAlerts([successAlert, ...alerts]);
  };

  const handleSOS = () => {
    const confirmed = window.confirm('⚠️ Are you sure you want to trigger an SOS alert? This will notify emergency contacts immediately.');
    
    if (!confirmed) return;
    
    const timestamp = new Date();
    const sosEntry = {
      time: timestamp.toLocaleString(),
      location: 'Current Location',
      status: 'emergency'
    };
    
    const updatedSOS = [sosEntry, ...sosLog];
    setSosLog(updatedSOS);
    localStorage.setItem('sosLog', JSON.stringify(updatedSOS));
    
    // Add urgent alert
    const sosAlert = {
      id: Date.now().toString(),
      type: 'urgent',
      title: '🆘 SOS Alert Triggered',
      message: 'Emergency services and your emergency contacts have been notified. Help is on the way. Stay safe!',
      timestamp: timestamp,
      read: false,
      actionRequired: true
    };
    setAlerts([sosAlert, ...alerts]);
    
    alert('🆘 SOS Alert Sent!\n\nEmergency services have been notified.\nYour location has been shared with emergency contacts.\nStay where you are if safe to do so.');
  };

  const markAsRead = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread': return !alert.read;
      case 'urgent': return alert.type === 'urgent';
      case 'action': return alert.actionRequired;
      default: return true;
    }
  });

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const urgentCount = alerts.filter(alert => alert.type === 'urgent').length;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return '🔔';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <div className="page-container">
      <div className="alerts-header">
        <h1 className="page-title">Real-Time Travel Alerts</h1>
        <div className="alerts-summary">
          <span className="alert-count unread">{unreadCount} Unread</span>
          <span className="alert-count urgent">{urgentCount} Urgent</span>
        </div>
      </div>

      {/* Geopolitical Alerts Section */}
      <div className="geopolitical-alerts-section">
        <h2 className="section-title">🌍 Geopolitical & Security Alerts</h2>
        <div className="geopolitical-cards-grid">
          <div className="geo-alert-card war-zone">
            <div className="geo-alert-header">
              <div className="geo-icon">⚔️</div>
              <h3>War Zones</h3>
            </div>
            <div className="geo-alert-content">
              <div className="alert-badge critical">Critical</div>
              <p className="geo-description">Active conflict areas - Travel prohibited</p>
              <ul className="affected-regions">
                <li>🔴 Ukraine - Eastern regions</li>
                <li>🔴 Gaza Strip - All areas</li>
                <li>🔴 Syria - Northern regions</li>
              </ul>
              <div className="geo-stats">
                <span className="stat">3 Active Zones</span>
                <span className="stat">Travel Ban</span>
              </div>
            </div>
          </div>

          <div className="geo-alert-card political-tension">
            <div className="geo-alert-header">
              <div className="geo-icon">⚡</div>
              <h3>Political Tensions</h3>
            </div>
            <div className="geo-alert-content">
              <div className="alert-badge high">High Alert</div>
              <p className="geo-description">Heightened political instability</p>
              <ul className="affected-regions">
                <li>🟠 Taiwan Strait - Military exercises</li>
                <li>🟠 Kashmir - Border tensions</li>
                <li>🟠 Venezuela - Political unrest</li>
              </ul>
              <div className="geo-stats">
                <span className="stat">5 Regions</span>
                <span className="stat">Caution Advised</span>
              </div>
            </div>
          </div>

          <div className="geo-alert-card social-unrest">
            <div className="geo-alert-header">
              <div className="geo-icon">👥</div>
              <h3>Social Unrest</h3>
            </div>
            <div className="geo-alert-content">
              <div className="alert-badge medium">Medium Alert</div>
              <p className="geo-description">Protests and civil demonstrations</p>
              <ul className="affected-regions">
                <li>🟡 France - Labor strikes ongoing</li>
                <li>🟡 Peru - Political protests</li>
                <li>🟡 Kenya - Economic demonstrations</li>
              </ul>
              <div className="geo-stats">
                <span className="stat">8 Countries</span>
                <span className="stat">Monitor Closely</span>
              </div>
            </div>
          </div>

          <div className="geo-alert-card terrorism">
            <div className="geo-alert-header">
              <div className="geo-icon">🛡️</div>
              <h3>Terrorism Threat</h3>
            </div>
            <div className="geo-alert-content">
              <div className="alert-badge elevated">Elevated</div>
              <p className="geo-description">Increased security measures required</p>
              <ul className="affected-regions">
                <li>🟠 Afghanistan - High threat level</li>
                <li>🟡 Somalia - Moderate threat</li>
                <li>🟡 Yemen - Moderate threat</li>
              </ul>
              <div className="geo-stats">
                <span className="stat">12 Regions</span>
                <span className="stat">Extra Vigilance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Features Section */}
      <div className="safety-features-grid">
        <div className="feature-card checkin-card">
          <div className="feature-header">
            <div className="feature-icon checkin">📍</div>
            <div>
              <h3>Geo-Tracking / Check-In</h3>
              <p>Record your safe location</p>
            </div>
          </div>
          <div className="feature-status">
            <span className="status-label">Last Check-in:</span>
            <span className="status-value">{lastCheckIn}</span>
          </div>
          <button className="feature-button checkin-btn" onClick={handleCheckIn}>
            ✅ Check-In Now
          </button>
          {checkIns.length > 0 && (
            <div className="feature-log">
              <h4>Recent Check-ins</h4>
              <ul>
                {checkIns.slice(0, 3).map((log, i) => (
                  <li key={i}>
                    <span className="log-icon">✅</span>
                    <span>{log.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="feature-card sos-card">
          <div className="feature-header">
            <div className="feature-icon sos">🆘</div>
            <div>
              <h3>Emergency SOS</h3>
              <p>Press in case of emergency</p>
            </div>
          </div>
          <div className="sos-warning">
            ⚠️ This will notify emergency services and your emergency contacts immediately
          </div>
          <button className="feature-button sos-btn" onClick={handleSOS}>
            🆘 TRIGGER SOS
          </button>
          {sosLog.length > 0 && (
            <div className="feature-log sos-log">
              <h4>SOS History</h4>
              <ul>
                {sosLog.slice(0, 3).map((log, i) => (
                  <li key={i}>
                    <span className="log-icon">❗</span>
                    <span>{log.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="feature-card add-alert-card">
          <div className="feature-header">
            <div className="feature-icon add">➕</div>
            <div>
              <h3>Add Custom Alert</h3>
              <p>Create your own alert</p>
            </div>
          </div>
          <div className="add-alert-form">
            <input
              type="text"
              placeholder="Enter alert message..."
              value={newAlert}
              onChange={(e) => setNewAlert(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addAlert()}
              className="alert-input"
            />
            <button className="feature-button add-btn" onClick={addAlert}>
              ➕ Add Alert
            </button>
          </div>
        </div>
      </div>

      <div className="alerts-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Alerts
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={`filter-btn ${filter === 'urgent' ? 'active' : ''}`}
            onClick={() => setFilter('urgent')}
          >
            Urgent ({urgentCount})
          </button>
          <button 
            className={`filter-btn ${filter === 'action' ? 'active' : ''}`}
            onClick={() => setFilter('action')}
          >
            Action Required
          </button>
        </div>
        
        {unreadCount > 0 && (
          <button className="mark-all-read-btn" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        )}
      </div>

      <div className="alerts-list">
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <span className="no-alerts-icon">📭</span>
            <p>No alerts match your current filter</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`alert-item ${alert.type} ${alert.read ? 'read' : 'unread'}`}
            >
              <div className="alert-icon">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="alert-content">
                <div className="alert-header">
                  <h3 className="alert-title">{alert.title}</h3>
                  <div className="alert-actions">
                    {!alert.read && (
                      <button 
                        className="action-btn mark-read"
                        onClick={() => markAsRead(alert.id)}
                        title="Mark as read"
                      >
                        ✓
                      </button>
                    )}
                    <button 
                      className="action-btn dismiss"
                      onClick={() => dismissAlert(alert.id)}
                      title="Dismiss alert"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <p className="alert-message">{alert.message}</p>
                
                <div className="alert-footer">
                  <span className="alert-timestamp">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                  {alert.actionRequired && (
                    <span className="action-required-badge">
                      Action Required
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;