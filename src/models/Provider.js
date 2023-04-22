import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class Provider extends Model {}

Provider.init(
    {
        provider_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        provider_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        currency: {
            type: DataTypes.CHAR(3),
            allowNull: false,
        },
        unit: {
            type: DataTypes.CHAR(10),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Provider",
        tableName: "Providers", // Set the table name explicitly
        timestamps: false,
    }
);

export default Provider;
