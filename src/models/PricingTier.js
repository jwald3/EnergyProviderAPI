import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class PricingTier extends Model {}

PricingTier.init(
    {
        pricing_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        provider_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pricing_tier_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        rate: {
            type: DataTypes.NUMERIC(5, 3),
            allowNull: false,
            get() {
                const value = this.getDataValue("rate");
                return value ? parseFloat(value) : null;
            },
        },
    },
    {
        sequelize,
        modelName: "PricingTier",
        tableName: "pricing_tiers", // Set the table name explicitly
        timestamps: false,
    }
);

export default PricingTier;
