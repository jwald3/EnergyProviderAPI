import { Router } from "express";
import {
    getAllPricingTiers,
    getPricingTierById,
    createPricingTier,
    updatePricingTier,
    deletePricingTier,
} from "../controllers/pricingTierController.js";

const router = Router();

router.get("/", getAllPricingTiers);
router.get("/:PricingTierID", getPricingTierById);
router.post("/", createPricingTier);
router.put("/:PricingTierID", updatePricingTier);
router.delete("/:PricingTierID", deletePricingTier);

export default router;
