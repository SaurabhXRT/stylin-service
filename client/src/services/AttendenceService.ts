import { client } from "../apollo/client";
import {
  CREATE_ATTENDENCE_TIMINGS,
  RECORD_ATTENDENCE,
} from "../graphql/Attendence/mutations";
import {
  CHECK_TODAYS_ATTENDANCE,
  GET_STAFF_ATTENDENCE_RECORD,
} from "../graphql/Attendence/queries";
interface AttendanceTimings {
  salonId: string;
  startTime: string;
  endTime: string;
}

interface AttendanceInput {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  capturedImage: File;
}

export const createAttendenceTimings = async (input: AttendanceTimings) => {
  const response = await client.mutate({
    mutation: CREATE_ATTENDENCE_TIMINGS,
    variables: input,
  });
  return response.data.createAttendenceTimings;
};

export const checkTodaysAttendance = async () => {
  const response = await client.query({
    query: CHECK_TODAYS_ATTENDANCE,
  });
  return response.data.checkTodaysAttendance.exists;
};

export const recordStaffAttendence = async (input: AttendanceInput) => {
  console.log(input);
  const response = await client.mutate({
    mutation: RECORD_ATTENDENCE,
    variables: input,
  });
  return response.data.recordAttendance;
};

export const getStaffAttendenceRecord = async (staffId: string) => {
  const response = await client.query({
    query: GET_STAFF_ATTENDENCE_RECORD,
    variables: { staffId },
  });
  return response.data.getStaffAttendenceRecord;
};
