import express from "express";
import { pullGacha, addItem, getItems, getUserItems, getPullHistory, recycleItem, claimDaily } from "../controllers/ItemController.ts";
import { verifyToken } from "../utils/AuthMiddleware.ts";

const itemRoutes = express.Router();

itemRoutes.get('/', getItems);
itemRoutes.post('/pull', verifyToken, pullGacha);
itemRoutes.post('/add', addItem);
itemRoutes.get('/inventory/:username', getUserItems);
itemRoutes.get('/history', verifyToken, getPullHistory);
itemRoutes.post('/recycle', verifyToken, recycleItem);
itemRoutes.post('/daily-claim', verifyToken, claimDaily);

export default itemRoutes;