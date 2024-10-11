import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStaffProfile, getStaffFeedback, getStaffClientService } from "../../services/staffService";
import { getStaffAttendenceRecord } from "../../services/AttendenceService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userId: string;
}

interface AttendenceRecord {
  id: string;
  checkInDate: string;
  checkInTime: string;
  status: string;
}

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
  profileImage?: string;
}

const StaffDetails: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);
  const [staffFeedback, setStaffFeedback] = useState<Feedback[]>([]);
  const [clientService, setClientService] = useState<{ count: number } | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendenceRecord[]>([]);
  const [period, setPeriod] = useState<string>("daily");

  useEffect(() => {
    const fetchData = async () => {
      if (staffId) {
        const profile = await getStaffProfile(staffId);
        setStaffProfile(profile);

        const feedback = await getStaffFeedback(staffId);
        setStaffFeedback(feedback);

        const service = await getStaffClientService(staffId, period);
        setClientService(service);

        const attendance = await getStaffAttendenceRecord(staffId);
        setAttendanceRecords(attendance);
      }
    };

    fetchData();
  }, [staffId, period]);

  return (
    <div className="m-10 p-8 " >
      <h1 className="text-2xl font-bold mb-4">Staff Details</h1>

      {staffProfile && (
        <Card className="mb-4 p-6">
          <CardHeader>
            <CardTitle>{staffProfile.name}</CardTitle>
            <CardDescription>{staffProfile.jobTitle} - {staffProfile.department}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {staffProfile.email}</p>
            <p><strong>Contact Number:</strong> {staffProfile.contactNumber}</p>
            <p><strong>Date of Joining:</strong> {staffProfile.dateOfJoining}</p>
            <p><strong>Role:</strong> {staffProfile.role}</p>
            {staffProfile.profileImage && (
              <img
                src={staffProfile.profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mt-4"
              />
            )}
          </CardContent>
          <CardFooter>
            <p>{staffProfile.address}</p>
          </CardFooter>
        </Card>
      )}

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* Feedback Section */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {staffFeedback.length ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rating</TableCell>
                      <TableCell>Comment</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {staffFeedback.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>{feedback.rating}</TableCell>
                        <TableCell>{feedback.comment}</TableCell>
                        <TableCell>
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No feedback available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Provided</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setPeriod} value={period}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>

              {clientService && (
                <p className="mt-4">
                  Services provided in selected period: <strong>{clientService.count}</strong>
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Section */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Check-In Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.checkInDate}</TableCell>
                        <TableCell>{record.checkInTime}</TableCell>
                        <TableCell>{record.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No attendance records available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { StaffDetails };
