import express from "express"
import { cancelSubscription, mockCheckOut } from "../controllers/SubscriptionController.js";
import { verifyToken } from "../utils/AuthMiddleware.js";

const subscriptionRoutes = express.Router();

subscriptionRoutes.post("/", verifyToken, mockCheckOut);
subscriptionRoutes.post("/cancel", verifyToken, cancelSubscription);

export default subscriptionRoutes;