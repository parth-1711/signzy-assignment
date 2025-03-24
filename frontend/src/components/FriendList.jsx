import React, { useState, useEffect } from 'react';
import API from '../api';

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  // Fetch friends from backend
  const fetchFriends = async () => {
    try {
      const res = await API.get('/users/friends');
      setFriends(res.data.friends);
    } catch (err) {
      console.error('Error fetching friends:', err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Friends</h3>

      {friends.length === 0 ? (
        <p className="text-gray-500">You have no friends yet.</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800">{friend.username}</span>

              {/* Optional Unfriend Button (needs backend logic to handle) */}
              <button
                disabled
                className="bg-red-300 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
              >
                Unfriend
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
