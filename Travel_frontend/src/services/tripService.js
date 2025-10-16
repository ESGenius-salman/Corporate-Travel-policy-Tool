// Mock API service for trip requests
/*export const tripService = {
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
};*/

/*import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/travel";

export const tripService = {
  async submitTripRequest(tripData) {
    try {
      const token = localStorage.getItem("token"); // ✅ get JWT from login

      const response = await axios.post(API_BASE_URL, tripData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ required for authMiddleware
        },
        withCredentials: true, // ✅ allow cookies if backend needs them
      });

      return response.data;
    } catch (error) {
      console.error("Error submitting trip request:", error.response || error);
      throw error.response?.data || error;
    }
  },*/
 import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/travel";

export const tripService = {
  submitTripRequest: async (tripData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const response = await axios.post(API_BASE_URL, tripData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getMyTrips: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const response = await axios.get(`${API_BASE_URL}/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  cancelTripRequest: async (tripId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const response = await axios.delete(`${API_BASE_URL}/${tripId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateTripRequest: async (tripId, updates) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not logged in");

    const response = await axios.put(`${API_BASE_URL}/${tripId}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
