import React, { useEffect, useState } from "react";
import { getAllSalons } from "../../services/salonService";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Salon {
  id: string;
  name: string;
  placename: string;
}

const SalonList: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const fetchedSalons = await getAllSalons();
        setSalons(fetchedSalons);
      } catch (error) {
        console.error("Error fetching salons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleCardClick = (salonId: string) => {
    navigate(`/user-dashboard/salon/${salonId}`);
  };

  if (loading) {
    return <p>Loading salons...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-8">All Salons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {salons.length > 0 ? (
          salons.map((salon) => (
            <Card
              key={salon.id}
              className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleCardClick(salon.id)}
            >
              <CardHeader>
                <CardTitle>{salon.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{salon.placename}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No salons available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default SalonList;
