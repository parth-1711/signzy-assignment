import React, { useState, useEffect } from 'react';
import API from '../api';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch pending friend requests from backend
  const fetchFriendRequests = async () => {
    try {
      const res = await API.get('/users/friend-requests');
      setRequests(res.data.requests);
    } catch (err) {
      console.error('Error fetching friend requests:', err);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  // Accept friend request
  const acceptRequest = async (id) => {
    try {
      await API.post(`/users/accept-request/${id}`);
      alert('Friend request accepted!');
      setRequests(requests.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to accept request.');
    }
  };

  // Reject friend request
  const rejectRequest = async (id) => {
    try {
      await API.post(`/users/reject-request/${id}`);
      alert('Friend request rejected.');
      setRequests(requests.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to reject request.');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Friend Requests</h3>

      {requests.length === 0 ? (
        <p className="text-gray-500">You have no pending friend requests.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800">{user.username}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => acceptRequest(user._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => rejectRequest(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;
