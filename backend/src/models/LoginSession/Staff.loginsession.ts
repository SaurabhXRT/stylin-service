import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

export class StaffLoginSession extends Model {}

StaffLoginSession.init(
  {
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    timestamps: true,
    modelName: 'StaffLoginSession',
    createdAt: true,
  }
);