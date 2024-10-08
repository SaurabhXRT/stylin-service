import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const StaffTable: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
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

  const handleTakeService = (staffId: string) => {
    navigate(`/user-dashboard/salon/staff/${staffId}`);
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
                    onClick={() => handleTakeService(staff.id)}
                    variant="destructive"
                  >
                    Take Service
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

export { StaffTable };
