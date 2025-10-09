import React, { useState } from 'react';
import TripRequestForm from './TripRequestForm';
import TripRequestCard from './TripRequestCard';
import { tripService } from '../../services/tripService';
import './TripRequest.css';

const TripRequest = () => {
  const [submittedTrips, setSubmittedTrips] = useState([
    {
      id: '1',
      destination: 'New York, NY',
      startDate: '2024-03-15',
      endDate: '2024-03-18',
      purpose: 'Client meeting and conference',
      status: 'approved',
      submittedDate: '2024-03-01'
    },
    {
      id: '2',
      destination: 'San Francisco, CA',
      startDate: '2024-04-10',
      endDate: '2024-04-12',
      purpose: 'Team workshop',
      status: 'pending',
      submittedDate: '2024-03-05'
    }
  ]);

  const handleTripSubmit = async (tripData) => {
    try {
      const newTrip = await tripService.submitTripRequest(tripData);
      setSubmittedTrips(prev => [newTrip, ...prev]);
      return { success: true, message: 'Trip request submitted successfully!' };
    } catch (error) {
      return { success: false, message: 'Failed to submit trip request. Please try again.' };
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Trip Request</h1>
      
      <div className="trip-request-layout">
        <div className="form-section">
          <TripRequestForm onSubmit={handleTripSubmit} />
        </div>
        
        <div className="trips-section">
          <h2>Your Trip Requests</h2>
          {submittedTrips.length === 0 ? (
            <p className="no-trips">No trip requests yet. Submit your first request!</p>
          ) : (
            <div className="trips-list">
              {submittedTrips.map(trip => (
                <TripRequestCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripRequest;