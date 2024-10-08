import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { token, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token && role) {
      toast.success("Welcome back!", {
        duration: 4000,
        position: "top-right",
        icon: "🎉",
      });

      switch (role) {
        case "user":
          navigate("/user-dashboard");
          break;
        case "staff":
          navigate("/staff-dashboard");
          break;
        case "owner":
          navigate("/owner-dashboard");
          break;
        default:
          navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate, token, role]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to salon website</h1>
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
            <button >
              User or Owner Login
            </button>
          </Link>
          <Link to="/login-staff" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200">
            <button >
              Login as Staff
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
