import PricingTier from "../models/PricingTier.js";
import PricingTierDays from "../models/PricingTierDays.js";
import PricingTierSpecialDates from "../models/PricingTierSpecialDates";
import sequelize from "../utils/database.js";

// Helper function to fetch pricing tier days and special dates
const getPricingTierDetails = async (pricing_id) => {
    const pricingTierDays = await PricingTierDays.findAll({
        where: { pricing_id: pricing_id },
    });
    const pricingTierSpecialDates = await PricingTierSpecialDates.findAll({
        where: { pricing_id: pricing_id },
    });

    return {
        pricingTierDays,
        pricingTierSpecialDates,
    };
};

export const getAllPricingTiers = async (req, res) => {
    try {
        const pricingTiers = await PricingTier.findAll();
        for (const pricingTier of pricingTiers) {
            const { pricingTierDays, pricingTierSpecialDates } =
                await getPricingTierDetails(pricingTier.pricing_id);
            pricingTier.setDataValue("pricingTierDays", pricingTierDays);
            pricingTier.setDataValue(
                "pricingTierSpecialDates",
                pricingTierSpecialDates
            );
        }
        res.json(pricingTiers);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error retrieving PricingTiers" });
    }
};

export const getPricingTierById = async (req, res) => {
    try {
        const pricingTier = await PricingTier.findByPk(req.params.pricing_id);
        if (!pricingTier)
            return res.status(404).json({ message: "PricingTier not found." });
        const { pricingTierDays, pricingTierSpecialDates } =
            await getPricingTierDetails(pricingTier.pricing_id);
        pricingTier.setDataValue("pricingTierDays", pricingTierDays);
        pricingTier.setDataValue(
            "pricingTierSpecialDates",
            pricingTierSpecialDates
        );
        res.json(pricingTier);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error retrieving PricingTier." });
    }
};

export const createPricingTier = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const pricingTier = await PricingTier.create(req.body, { transaction });
        const pricing_id = pricingTier.pricing_id;

        const pricingTierDays = req.body.pricingTierDays.map((day) => ({
            pricing_id: pricing_id,
            day_of_week: day,
        }));
        const pricingTierSpecialDates = req.body.pricingTierSpecialDates.map(
            (date) => ({
                pricing_id: pricing_id,
                special_date: date,
            })
        );

        await PricingTierDays.bulkCreate(pricingTierDays, { transaction });
        await PricingTierSpecialDates.bulkCreate(pricingTierSpecialDates, {
            transaction,
        });

        await transaction.commit();
        res.status(201).json(pricingTier);
    } catch (error) {
        await transaction.rollback();
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error creating PricingTier." });
    }
};
export const updatePricingTier = async (req, res) => {
    try {
        const [updatedRows] = await PricingTier.update(req.body, {
            where: { pricing_id: req.params.pricing_id },
        });

        if (!updatedRows)
            return res.status(404).json({ message: "PricingTier not found." });
        res.json({ message: "PricingTier updated." });
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error updating PricingTier." });
    }
};

export const deletePricingTier = async (req, res) => {
    try {
        const deletedRows = await PricingTier.destroy({
            where: { pricing_id: req.params.pricing_id }, // Update this line
        });

        if (!deletedRows)
            return res.status(404).json({ message: "PricingTier not found." });
        res.json({ message: "PricingTier deleted." });
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error deleting PricingTier." });
    }
};
