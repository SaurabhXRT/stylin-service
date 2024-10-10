import React, { useEffect, useState } from "react";
import {
  getAllLeaveApplications,
  updateLeaveStatus,
} from "../../services/leaveService";
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
interface LeaveApplication {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  staff: {
    id: string;
    name: string;
    email: string;
    role: string;
    contactNumber: string;
  };
}

const LeaveApplicationTable: React.FC = () => {
  const [leaveApplications, setLeaveApplications] = useState<
    LeaveApplication[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const fetchedApplications = await getAllLeaveApplications();
        console.log(fetchedApplications);
        setLeaveApplications(fetchedApplications);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveApplications();
  }, []);

  const handleStatusChange = async (applicationId: string, status: string) => {
    try {
      const response = await updateLeaveStatus({ applicationId, status });
      if(response){
        toast.success(`leave application ${status} successfully `)
      }
      setLeaveApplications((prev) =>
        prev.map((application) =>
          application.id === applicationId
            ? { ...application, status }
            : application
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  if (loading) {
    return <p>Loading leave applications...</p>;
  }

  return (
    <div className="flex items-center min-h-screen">
      <div className="w-full p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          Leave Applications
        </h1>
        <Table>
          <TableCaption>
            All leave applications submitted by staff.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaveApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.staff.name}</TableCell>
                <TableCell>{application.staff.email}</TableCell>
                <TableCell>{application.staff.contactNumber}</TableCell>
                <TableCell>{application.leaveType}</TableCell>
                <TableCell>{application.startDate}</TableCell>
                <TableCell>{application.endDate}</TableCell>
                <TableCell>{application.reason}</TableCell>
                <TableCell>{application.status}</TableCell>

                <TableCell className="text-right">
                  <Button
                    onClick={() =>
                      handleStatusChange(application.id, "Approved")
                    }
                    className="mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() =>
                      handleStatusChange(application.id, "Rejected")
                    }
                    variant="destructive"
                  >
                    Reject
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

export { LeaveApplicationTable };
