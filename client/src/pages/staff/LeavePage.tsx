import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  applyForLeave,
  getLeaveApplications,
} from "../../services/leaveService";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const leaveSchema = z.object({
  leaveType: z.string().min(1, { message: "Leave type is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
});

interface LeaveApplicationType {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
}

export function LeavePage() {
  const form = useForm<z.infer<typeof leaveSchema>>({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const [leaveApplications, setLeaveApplications] = useState<
    LeaveApplicationType[]
  >([]);

  const fetchLeaveApplications = async () => {
    try {
      const response = await getLeaveApplications();
      setLeaveApplications(response);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch leave applications");
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const onSubmit = async (values: z.infer<typeof leaveSchema>) => {
    try {
      const data = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      };
      const response = await applyForLeave(data);
      if (response) {
        await fetchLeaveApplications();
        toast.success("Leave applied successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to apply for leave");
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between m-10">
        {/* Left side: Leave Application Form */}
        <div className="flex-1 mr-4">
          <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leave Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Leave Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                          <SelectItem value="Casual Leave">
                            Casual Leave
                          </SelectItem>
                          <SelectItem value="Annual Leave">
                            Annual Leave
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the reason for leave"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Submit Leave Application
              </Button>
            </form>
          </Form>
        </div>

        {/* Right side: My Leave Applications */}
        <div className="flex-1 ml-4">
          <h3 className="text-lg font-semibold">My Leave Applications</h3>
          {leaveApplications.length === 0 ? (
            <p>No leave applications found.</p>
          ) : (
            leaveApplications.map((leave) => (
              <div key={leave.id} className="p-4 border mb-4 rounded-lg">
                <p>
                  <strong>Type:</strong> {leave.leaveType}
                </p>
                <p>
                  <strong>Start Date:</strong> {leave.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {leave.endDate}
                </p>
                <p>
                  <strong>Status:</strong> {leave.status}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
