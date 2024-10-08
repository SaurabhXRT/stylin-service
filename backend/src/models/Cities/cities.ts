import { DataTypes, Model } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";
import { citydata } from "./city.js";

export class CityDetail extends Model {}
CityDetail.init(
  {
    cityname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: centralDatabase.getInstance(),
    timestamps: true,
    modelName: "CityDetail",
    createdAt: true,
  }
);

interface City {
  id: number;
  city: string;
  district: string;
  "std-code": number;
  state: string;
  "gst-state-code": string;
  "iso_3166-2": string;
  population: number;
  rank: number;
  latitude: number;
  longitude: number;
  altitude: number;
}

const seedCitiesFromJSON = async (): Promise<void> => {
  try {
    await CityDetail.destroy({
        truncate: true, 
      });
    await CityDetail.bulkCreate(
      citydata.map((city: City) => ({
        cityname: city.city,
        latitude: city.latitude,
        longitude: city.longitude,
      }))
    );

    console.log("City data successfully seeded into the database!");
  } catch (err) {
    console.error("Error seeding city data:", err);
  }
};

//seedCitiesFromJSON();
