import React, { useState, useEffect } from 'react';
import API from '../api';

const Recommendations = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await API.get('/users/recommendations');
        setRecommended(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Recommended Friends</h3>
      {recommended.length === 0 ? (
        <p className="text-gray-500">No recommendations at the moment.</p>
      ) : (
        <ul className="space-y-3">
          {recommended.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800">{user.username}</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
