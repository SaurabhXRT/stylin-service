import React, { useEffect, useState } from "react";
import { getOwnerSalons } from "../../services/salonService";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Salon {
  id: string;
  name: string;
  placename: string;
}

const SalonCard: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const fetchedSalons = await getOwnerSalons();
        setSalons(fetchedSalons);
      } catch (error) {
        console.error("Error fetching salons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleCreateSalonClick = () => {
    navigate("/owner-dashboard/create-salon");
  };

  const handleCreateStaffClick = (salonId: string) => {
    navigate(`/owner-dashboard/salon/create-staff/${salonId}`);
  };
  const handleViewStaffClick = (salonId: string) => {
    navigate(`/owner-dashboard/salon/${salonId}`);
  };

  if (loading) {
    return <p>Loading salons...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold  mb-8">Your Salons</h1>
      <Button onClick={handleCreateSalonClick} className="mb-4">
        Create New Salon
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {salons &&
          salons.map((salon) => (
            <Card
              key={salon.id}
              className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <CardTitle>{salon.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{salon.placename}</p>
              </CardContent>
              <Button
                onClick={() => handleCreateStaffClick(salon.id)}
                className="mt-4"
              >
                Create Staff
              </Button>
              <Button
                onClick={() => handleViewStaffClick(salon.id)}
                className="mt-2 mx-2"
              >
                View All Staffs
              </Button>
            </Card>
          ))}
        {!salons && <p>No salons available at the moment.</p>}
      </div>
    </div>
  );
};

export default SalonCard;
