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
router.get("/:pricing_id", getPricingTierById);
router.post("/", createPricingTier);
router.put("/:pricing_id", updatePricingTier);
router.delete("/:pricing_id", deletePricingTier);

export default router;
