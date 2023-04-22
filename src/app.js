import express from "express";
import providerRoutes from "./routes/providerRoutes.js";
import pricingTierRoutes from "./routes/pricingTierRoutes.js";

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the provider routes on the app
app.use("/providers", providerRoutes);
app.use("/pricing_tiers", pricingTierRoutes);

const port = process.env.PORT || 3000;

export { app, port };
