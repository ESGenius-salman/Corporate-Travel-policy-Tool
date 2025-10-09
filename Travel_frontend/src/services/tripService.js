// Mock API service for trip requests
export const tripService = {
  async submitTripRequest(tripData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    
    // Simulate occasional API errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
    
    return newTrip;
  },

  async getTripRequests(userId) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock trip requests data
    return [
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
    ];
  },

  async updateTripRequest(tripId, updates) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful update
    return {
      id: tripId,
      ...updates,
      updatedDate: new Date().toISOString().split('T')[0]
    };
  },

  async cancelTripRequest(tripId) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock successful cancellation
    return {
      success: true,
      message: 'Trip request cancelled successfully'
    };
  }
};