import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-500">
        Friend Finder
      </Link>
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 hover:underline mr-4">
              Login
            </Link>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
