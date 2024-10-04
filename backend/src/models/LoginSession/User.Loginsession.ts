import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

export class UserLoginSession extends Model {}

UserLoginSession.init(
  {
    userId: {
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
    modelName: 'UserLoginSession',
    createdAt: true,
  }
);