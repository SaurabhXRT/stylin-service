import logger from "../logger/logger.js";
import { AttendanceTimings } from "../models/Attendence/AttendenceTimings.js";
import { Attendance } from "../models/Attendence/Attendence.js";
import { isWithinRadius, calculateDistance } from "../utils/distanceUtil.js";
import { matchFaces } from "../utils/faceMatch.js";
import { Staff } from "../models/Staff/Staff.js";
import { Salon } from "../models/Salon/Salon.js";

export class AttendenceService {
  async createAttendenceTimings(attendancedata: any) {
    try {
      const existingTimings = await AttendanceTimings.findOne({
        where: {
          salonId: attendancedata.salonId,
        },
      });

      if (existingTimings) {
        await existingTimings.update({ ...attendancedata });
        return existingTimings.toJSON();
      } else {
        const newTimings = await AttendanceTimings.create({
          ...attendancedata,
        });
        return newTimings.toJSON();
      }
    } catch (error) {
      logger.log(error);
    }
  }

  async checkTodaysAttendance(staffId: string) {
    const today = new Date().toISOString().split("T")[0];
    const response = await Attendance.findOne({
      where: {
        staffId,
        checkInDate: today,
      },
    });
    console.log(response);
    return response;
  }

  async recordAttendance(staffId: string, location: any, capturedImage: any) {
    // console.log("location got",location);
    // console.log("capturedimage got",capturedImage);
    const staff = await Staff.findOne({
      where: {
        id: staffId,
      },
      include: [
        {
          model: Salon,
          as: "salon",
          attributes: ["id","latitude", "longitude"],
        },
      ],
    });
    const data = staff.toJSON();
    console.log(data);
    const lat1 = data.salon.latitude;
    const lon1 = data.salon.longitude;
    const { lat2, lon2 } = location;

    const distance = calculateDistance(lat1,lon1,lat2,lon2);

    // if (!isWithinRadius(distance)) {
    // return { success: false, message: "You are outside the allowed attendance radius." }
    // }

    const storedProfileImage = data.profileImage;
    const isFaceMatched = await matchFaces(storedProfileImage, capturedImage);

    if (!isFaceMatched) {
      return { success: false, message: "face didnt matched" };
    }

    const attendanceTiming = await AttendanceTimings.findOne({
      where: { 
        salonId: data.salon.id 
      },
    });
  
    if (!attendanceTiming) {
      return { success: false, message: 'Attendance timings not set for this salon.' };
    }
  
    const currentTime = new Date().toTimeString().split(' ')[0]; 
    const currentDate = new Date().toISOString().split('T')[0]; 
    const status =
      currentTime >= attendanceTiming.startTime && currentTime <= attendanceTiming.endTime
        ? 'Present'
        : 'Late';
  
 
    await Attendance.create({
      staffId,
      checkInTime: currentTime,
      checkInDate: currentDate,
      status,
    });
    console.log(
      `Attendance recorded for staffId: ${staffId} at location: ${JSON.stringify(
        location
      )}`
    );

    return { success: true, message: "Attendance recorded successfully." };
  }
}
