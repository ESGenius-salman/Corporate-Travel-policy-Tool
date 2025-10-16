import React, { useState, useEffect } from 'react';
import TripRequestForm from './TripRequestForm';
import TripRequestCard from './TripRequestCard';
import { tripService } from '../../services/tripService';
import './TripRequest.css';

const TripRequest = () => {
  const [submittedTrips, setSubmittedTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Fetch trips on mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const trips = await tripService.getMyTrips();
        setSubmittedTrips(trips);
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      } finally {
        setLoadingTrips(false);
      }
    };
    fetchTrips();
  }, []);

  // Submit new trip
  const handleTripSubmit = async (tripData) => {
    try {
      const newTrip = await tripService.submitTripRequest(tripData);
      setSubmittedTrips(prev => [newTrip, ...prev]);
      return { success: true, message: 'Trip request submitted successfully!' };
    } catch (error) {
      console.error('Trip submission failed:', error);
      return { success: false, message: 'Failed to submit trip request. Please try again.' };
    }
  };

  // Cancel a trip
  const handleCancelTrip = async (tripId) => {
    try {
      await tripService.cancelTripRequest(tripId);
      setSubmittedTrips(prev => prev.filter(trip => trip.id !== tripId && trip._id !== tripId));
    } catch (error) {
      console.error('Failed to cancel trip:', error);
    }
  };

  // Update a trip (example: update urgency)
  const handleUpdateTrip = async (tripId, updates) => {
    try {
      const updatedTrip = await tripService.updateTripRequest(tripId, updates);
      setSubmittedTrips(prev => prev.map(trip => (trip.id === tripId || trip._id === tripId ? updatedTrip : trip)));
    } catch (error) {
      console.error('Failed to update trip:', error);
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

          {loadingTrips ? (
            <p>Loading your trips...</p>
          ) : submittedTrips.length === 0 ? (
            <p className="no-trips">No trip requests yet. Submit your first request!</p>
          ) : (
            <div className="trips-list">
              {submittedTrips.map(trip => (
                <TripRequestCard
                  key={trip.id || trip._id}
                  trip={trip}
                  onCancel={() => handleCancelTrip(trip.id || trip._id)}
                  onUpdate={(updates) => handleUpdateTrip(trip.id || trip._id, updates)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripRequest;
