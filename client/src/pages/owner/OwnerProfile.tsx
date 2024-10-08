import React, { useEffect, useState } from "react";
import { getMe } from "../../services/userService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Owner {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

const OwnerProfileCard: React.FC = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const fetchedOwner = await getMe();
        setOwner(fetchedOwner);
      } catch (error) {
        console.error("Error fetching owner profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, []);

  if (loading) {
    return <p>Loading owner profile...</p>;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Owner Profile</CardTitle>
        <CardDescription>{owner?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Name: {owner?.name}</p>
        <p className="text-sm text-gray-500">Username: {owner?.username}</p>
        <p className="text-sm text-gray-500">Role: {owner?.role}</p>
      </CardContent>
    </Card>
  );
};

export default OwnerProfileCard;
