import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getStaffProfile,
  recordStaffService,
  giveFeedback,
} from "../../services/staffService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
interface Staff {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  role: string;
  expertise: string;
  department: string;
}
interface FeedbackFormData {
  rating: number;
  comment: string;
}

const StaffServicePage: React.FC = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [serviceTaken, setServiceTaken] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<FeedbackFormData>();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        if (staffId) {
          const fetchedStaff = await getStaffProfile(staffId);
          console.log(fetchedStaff);
          setStaff(fetchedStaff);
        }
      } catch (error) {
        console.error("Error fetching staff profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [staffId]);

  const handleTakeService = async () => {
    if (staffId) {
      try {
        const response = await recordStaffService(staffId);
        setServiceTaken(true);
        toast.success(response.message);
      } catch (error) {
        console.error("Error taking service:", error);
      }
    }
  };

  const onSubmitFeedback: SubmitHandler<FeedbackFormData> = async (data) => {
    if (staffId) {
      try {
        const response = await giveFeedback({
          staffId,
          rating: data.rating,
          comment: data.comment,
        });
        if(response){
            toast.success("you are feedback has been submitted sucessfully");
        }
        reset();
      } catch (error) {
        console.error("Error giving feedback:", error);
      }
    }
  };

  if (loading) {
    return <p>Loading staff details...</p>;
  }

  if (!staff) {
    return <p>No staff found.</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-white">
      <Card className="w-full max-w-lg mb-8 shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold">{staff.name}</h2>
          <p>{staff.email}</p>
          <p>{staff.contactNumber}</p>
          <p>{staff.jobTitle}</p>
          <p>{staff.expertise}</p>
          <p>{staff.department}</p>
        </div>
      </Card>

      {!serviceTaken ? (
        <Button onClick={handleTakeService} variant="destructive">
          Take Service
        </Button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmitFeedback)}
          className="w-full max-w-lg p-6 bg-white shadow-md"
        >
          <h3 className="text-lg font-semibold mb-4">youhave taken service please Give Feedback</h3>
          <div className="mb-4">
            <Input
              {...register("rating", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="Rating (1-5)"
              min={1}
              max={5}
            />
          </div>
          <div className="mb-4">
            <Textarea
              {...register("comment", { required: true })}
              placeholder="Your feedback"
            />
          </div>
          <Button type="submit" variant="destructive">
            Submit Feedback
          </Button>
        </form>
      )}
    </div>
  );
};

export { StaffServicePage };
