import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";

class Owner extends Model {}

Owner.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileImage: {
        type:  DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "Owner",
    timestamps: true,
  }
);

export { Owner };