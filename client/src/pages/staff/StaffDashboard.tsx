"use client";

import React, { useEffect, useState } from "react";
import {
  getMyself,
  getSalonOfStaff,
  uploadStaffImage,
} from "../../services/staffService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface StaffProfile {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  dateOfJoining: string;
  address?: string;
  role: string;
  expertise?: string;
  department?: string;
}

interface Salon {
  id: string;
  name: string;
  placename: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
}

const StaffDashboardPage = () => {
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);
  const [salon, setSalon] = useState<Salon | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffData = await getMyself();
        setStaffProfile(staffData);
        const salonData = await getSalonOfStaff();
        setSalon(salonData);
      } catch (error) {
        toast.error("Failed to load data");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setProfileImage(selectedFile);
      console.log(profileImage);
    }
  };

  const handleImageUploads = async () => {
    if (!profileImage) {
      toast.error("No image selected");
      return;
    }
    try {
      setLoading(true);
      const response = await uploadStaffImage({ profileImage });
      if (response) {
        toast.success("Profile image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to upload profile image.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!staffProfile || !salon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex space-x-4 w-full max-w-3xl mb-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{staffProfile.name}</CardTitle>
            <CardDescription>{staffProfile.role}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email: {staffProfile.email}</p>
            <p>Contact Number: {staffProfile.contactNumber}</p>
            <p>Job Title: {staffProfile.jobTitle}</p>
            <p>Date of Joining: {staffProfile.dateOfJoining}</p>
            {staffProfile.address && <p>Address: {staffProfile.address}</p>}
            {staffProfile.expertise && <p>Expertise: {staffProfile.expertise}</p>}
            {staffProfile.department && <p>Department: {staffProfile.department}</p>}
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Salon: {salon.name}</CardTitle>
            <CardDescription>{salon.placename}</CardDescription>
          </CardHeader>
          <CardContent>
            {salon.owner && (
              <>
                <p>Owner Name: {salon.owner.name}</p>
                <p>Owner Email: {salon.owner.email}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Upload Profile Image</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" accept="image/*" onChange={handleImage} />
          <Button
            className="mt-4"
            onClick={handleImageUploads} 
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export { StaffDashboardPage };
