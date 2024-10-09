import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class LeaveApplication extends Model {
  id: number;
  staffId: number;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason: string;
}

LeaveApplication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    leaveType: {
      type: DataTypes.ENUM("Sick Leave", "Casual Leave", "Annual Leave"),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "LeaveApplication",
    timestamps: true,
  }
);

export { LeaveApplication };
