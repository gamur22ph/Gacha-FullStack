import express from 'express';
import { handleStripeWebHook } from '../controllers/WebHookController.js';

const webHookRoutes = express.Router();

webHookRoutes.post("/", express.raw({ type: 'application/json' }), handleStripeWebHook);

export default webHookRoutes;