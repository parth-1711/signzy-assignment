import React, { useState } from 'react';
import API from '../api';

const SearchUsers = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await API.get(`/users?search=${search}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendRequest = async (id) => {
    try {
      await API.post(`/users/send-request/${id}`);
      alert('Friend request sent!');
    } catch (err) {
      alert('Error sending request');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Search Users</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <ul className="space-y-3">
          {results.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-gray-800">{user.username}</span>
              <button
                onClick={() => sendRequest(user._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default SearchUsers;
