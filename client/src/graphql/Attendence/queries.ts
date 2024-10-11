import { gql } from "@apollo/client";

export const CHECK_TODAYS_ATTENDANCE = gql`
  query checkTodaysAttendance {
    checkTodaysAttendance {
      exists
    }
  }
`;

export const GET_STAFF_ATTENDENCE_RECORD = gql`
  query getStaffAttendenceRecord($staffId: ID!) {
    getStaffAttendenceRecord(staffId: $staffId) {
      id
      staffId
      checkInDate
      checkInTime
      status
    }
  }
`;
