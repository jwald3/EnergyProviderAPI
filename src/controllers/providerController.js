import Provider from "../models/Provider.js";

export const getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.findAll();
        res.json(providers);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error retrieving Providers" });
    }
};

export const getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findByPk(req.params.ProviderID);
        if (!provider)
            return res.status(404).json({ message: "Provider not found." });
        res.json(Provider);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error retrieving Provider." });
    }
};

export const createProvider = async (req, res) => {
    try {
        const provider = await Provider.create(req.body);
        res.status(201).json(provider);
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error creating Provider." });
    }
};

export const updateProvider = async (req, res) => {
    try {
        const [updatedRows] = await Provider.update(req.body, {
            where: { ProviderID: req.params.ProviderID },
        });

        if (!updatedRows)
            return res.status(404).json({ message: "Provider not found." });
        res.json({ message: "Provider updated." });
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error updating Provider." });
    }
};

export const deleteProvider = async (req, res) => {
    try {
        const deletedRows = await Provider.destroy({
            where: { ProviderID: req.params.ProviderID },
        });

        if (!deletedRows)
            return res.status(404).json({ message: "Provider not found." });
        res.json({ message: "Provider deleted." });
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(500).json({ message: "Error deleting Provider." });
    }
};
