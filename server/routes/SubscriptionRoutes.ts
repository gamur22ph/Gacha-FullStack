import express from "express"
import { cancelSubscription, mockCheckOut } from "../controllers/SubscriptionController.ts";
import { verifyToken } from "../utils/AuthMiddleware.ts";

const subscriptionRoutes = express.Router();

subscriptionRoutes.post("/", verifyToken, mockCheckOut);
subscriptionRoutes.post("/cancel", verifyToken, cancelSubscription);

export default subscriptionRoutes;