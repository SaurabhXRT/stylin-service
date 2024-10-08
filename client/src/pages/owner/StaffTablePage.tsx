import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSalonStaffs } from "../../services/salonService";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Staff {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  role: string;
  dateOfJoining: string;
}

const StaffTableOwner: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        if (salonId) {
          const fetchedStaffs = await getSalonStaffs(salonId);
          setStaffs(fetchedStaffs);
        }
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, [salonId]);

  const handleDeleteStaff = (staffId: string) => {
    console.log(`Deleting staff with id: ${staffId}`);
  };

  const handleUpdateStaff = (staffId: string) => {
    console.log(`Updating staff with id: ${staffId}`);
  };

  const handleViewStaff = (staffId: string) => {
    console.log(`Viewing staff with id: ${staffId}`);
  };

  if (loading) {
    return <p>Loading staffs...</p>;
  }

  return (
    <div className="flex items-center  min-h-screen">
      <div className="w-full p-6 bg-white  shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">Salon Staffs</h1>
        <Table>
          <TableCaption>Staff details for the selected salon.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.contactNumber}</TableCell>
                <TableCell>{staff.jobTitle}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleViewStaff(staff.id)}
                    className="mr-2"
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleUpdateStaff(staff.id)}
                    className="mr-2"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteStaff(staff.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { StaffTableOwner };
