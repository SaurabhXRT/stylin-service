import React from "react";
import OwnerProfileCard from "./OwnerProfile";
import SalonCard from "./SalonCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <OwnerProfileCard />
      <div>
        <Button onClick={() => navigate("/owner-dashboard/leave-application")}>
          See leave applications
        </Button>
      </div>
      <SalonCard />
    </div>
  );
};

export { OwnerDashboard };
