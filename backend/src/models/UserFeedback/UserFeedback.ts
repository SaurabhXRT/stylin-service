import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";


class Feedback extends Model {
  public id!: number;
  public userId!: number;  
  public staffId!: number;  
  public rating!: number;   
  public comment!: string;  
}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,  
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    modelName: "Feedback",
    timestamps: true,  
  }
);

export { Feedback };
