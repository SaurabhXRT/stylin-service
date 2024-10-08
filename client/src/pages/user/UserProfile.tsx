import React, { useEffect, useState } from "react";
import { getMe } from "../../services/userService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getMe();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Profile</CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Name: {user?.name}</p>
        <p className="text-sm text-gray-500">Username: {user?.username}</p>
        <p className="text-sm text-gray-500">Role: {user?.role}</p>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
