import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSalonStaffs } from "../../services/salonService";
import { deleteStaff } from "../../services/staffService";
import { useNavigate } from "react-router-dom";
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
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Staff {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  role: string;
  dateOfJoining: string;
  status: string;
}

const StaffTableOwner: React.FC = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchStaffs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonId]);

  const handleDeleteStaff = async (staffId: string) => {
    const response = await deleteStaff(staffId);
    if (response) {
      toast.success(response.message);
    }
    await fetchStaffs();
    console.log(`Deleting staff with id: ${staffId}`);
  };

  const handleViewStaff = (staffId: string) => {
    navigate(`/owner-dashboard/staff/${staffId}`);
    console.log(`Viewing staff with id: ${staffId}`);
  };

  if (loading) {
    return <p>Loading staffs...</p>;
  }

  return (
    <div className="flex items-center min-h-screen">
      <div className="w-full p-6 bg-white shadow-md">
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
              <TableHead>status</TableHead>
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
                <TableCell>{staff.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleViewStaff(staff.id)}
                    className="mr-2"
                  >
                    View
                  </Button>

                  {/* AlertDialog for Delete Confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={() => setSelectedStaff(staff.id)}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the staff.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (selectedStaff) handleDeleteStaff(selectedStaff);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
