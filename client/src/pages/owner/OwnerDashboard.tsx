import React from "react";
import OwnerProfileCard from "./OwnerProfile";
import SalonCard from "./SalonCard";

const OwnerDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <OwnerProfileCard />
      <SalonCard />
    </div>
  );
};

export { OwnerDashboard };
