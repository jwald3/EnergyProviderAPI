import PricingTier from "../models/PricingTier.js";

export const getAllPricingTiers = async (req, res) => {
    try {
        const pricingTiers = await PricingTier.findAll();
        res.json(pricingTiers);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error retrieving PricingTiers" });
    }
};

export const getPricingTierById = async (req, res) => {
    try {
        const pricingTier = await PricingTier.findByPk(
            req.params.PricingTierID
        );
        if (!pricingTier)
            return res.status(404).json({ message: "PricingTier not found." });
        res.json(PricingTier);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error retrieving PricingTier." });
    }
};

export const createPricingTier = async (req, res) => {
    try {
        const pricingTier = await PricingTier.create(req.body);
        res.status(201).json(pricingTier);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error creating PricingTier." });
    }
};

export const updatePricingTier = async (req, res) => {
    try {
        const [updatedRows] = await PricingTier.update(req.body, {
            where: { PricingTierID: req.params.PricingTierID },
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
            where: { PricingTierID: req.params.PricingTierID },
        });

        if (!deletedRows)
            return res.status(404).json({ message: "PricingTier not found." });
        res.json({ message: "PricingTier deleted." });
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error deleting PricingTier." });
    }
};
