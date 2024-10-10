import { Model, DataTypes } from 'sequelize';
import { centralDatabase } from '../../config/dbconfig.js';

class Attendance extends Model {}

Attendance.init(
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
    checkInTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    checkInDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    status: {
      type: DataTypes.ENUM('Present', 'Absent', 'Late'),
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: 'Attendance',
    timestamps: true,
  }
);

export { Attendance };
