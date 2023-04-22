import { Router } from "express";
import {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider,
} from "../controllers/providerController.js";

const router = Router();

router.get("/", getAllProviders);
router.get("/:ProviderID", getProviderById);
router.post("/", createProvider);
router.put("/:ProviderID", updateProvider);
router.delete("/:ProviderID", deleteProvider);

export default router;
