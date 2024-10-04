import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class Staff extends Model {}

Staff.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("Manager", "Stylist", "Therapist", "Assistant", "hairdresser"),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expertise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfJoining: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workHours: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shift: {
      type: DataTypes.ENUM("Morning", "Afternoon", "Evening", "Night"),
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "On Leave"),
      defaultValue: "Active",
    },
    salonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "Staff",
    timestamps: true,
  }
);

export { Staff };
