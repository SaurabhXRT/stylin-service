import { gql } from "@apollo/client";

export const CHECK_TODAYS_ATTENDANCE = gql`
    query checkTodaysAttendance {
        checkTodaysAttendance {
            exists
        }
    }
`;
