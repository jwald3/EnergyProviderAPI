import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class PricingTierSpecialDates extends Model {}

PricingTierSpecialDates.init(
    {
        pricing_special_date_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        pricing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        special_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "PricingTierSpecialDates",
        tableName: "pricing_tier_special_dates", // Set the table name explicitly
        timestamps: false,
    }
);

export default PricingTierSpecialDates;
