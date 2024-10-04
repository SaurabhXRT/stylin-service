import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

export class OwnerLoginSession extends Model {}

OwnerLoginSession.init(
  {
    ownerId: {
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
    modelName: 'OwnerLoginSession',
    createdAt: true,
  }
);