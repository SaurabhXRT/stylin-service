import React from "react";
import UserProfile from "./UserProfile";
import SalonList from "./SalonList";

const UserDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile />
      <SalonList />
    </div>
  );
};

export { UserDashboard };
