import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class Service extends Model {
  public id!: number;
  public staffId!: number;
  public userId!: number;
  public dateOfService!: Date;
}

Service.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfService: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "Service",
    timestamps: true,
  }
);

export { Service };
