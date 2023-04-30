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
router.get("/:provider_id", getProviderById);
router.post("/", createProvider);
router.put("/:provider_id", updateProvider);
router.delete("/:provider_id", deleteProvider);

export default router;
