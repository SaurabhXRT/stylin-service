import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const { token, userRole } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && userRole) {
      toast.success("Welcome back!", {
        duration: 4000,
        position: 'top-right',
        icon: '🎉',
      });
      
      switch (userRole) {
        case 'user':
          navigate('/user-dashboard');
          break;
        case 'staff':
          navigate('/staff-dashboard');
          break;
        case 'owner':
          navigate('/owner-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate, token, userRole]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to salon website</h1>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login as User
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Login as Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
