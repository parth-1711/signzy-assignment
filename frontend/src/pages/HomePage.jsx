import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import FriendList from '../components/FriendList';
import SearchUsers from '../components/SearchUsers';
import Recommendations from '../components/Recommendations';
import FriendRequests from '../components/FriendRequests'; // ✅ New
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Welcome to Friend Finder</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <SearchUsers />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <FriendList />
          </div>
        </div>

        {/* ✅ Friend Requests Section */}
        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <FriendRequests />
        </div>

        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <Recommendations />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
