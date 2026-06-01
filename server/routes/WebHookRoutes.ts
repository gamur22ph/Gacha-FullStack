import express from 'express';
import { handleStripeWebHook } from '../controllers/WebHookController.ts';

const webHookRoutes = express.Router();

webHookRoutes.post("/", express.raw({ type: 'application/json' }), handleStripeWebHook);

export default webHookRoutes;