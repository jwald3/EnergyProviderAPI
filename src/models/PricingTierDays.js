import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class PricingTierDays extends Model {}

PricingTierDays.init(
    {
        pricing_tier_day_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pricing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        day_of_week: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "PricingTierDays",
        tableName: "pricing_tier_days", // Set the table name explicitly
        timestamps: false,
    }
);

export default PricingTierDays;
