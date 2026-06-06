import type { Request, Response } from 'express';
import { type IItem, Item } from '../models/Item.js';
import { grantGachaItem, rollGacha } from '../utils/GachaUtils.js';
import type { AuthenticatedRequest } from '../utils/AuthMiddleware.js';
import { User, type IUser } from '../models/User.js';
import { PullHistory, type IPullHistory } from '../models/PullHistory.js';
import jwt from 'jsonwebtoken';
import { resourceLimits } from 'node:worker_threads';
import { AddActivityLog } from '../utils/ActivityLogsUtils.js';

interface GachaRequest extends AuthenticatedRequest{
    body: {
        pullCount : number;
    }
}

interface ItemAddRequest extends Request{
    body: {
        itemId: string;
        rarity: number;
    }
}

interface GetPullHistoryRequest extends AuthenticatedRequest{
    body: {
        token: string
    }
}

interface RecycleItemRequest extends AuthenticatedRequest{
    body: {
        itemId: string;
    }
}

export const pullGacha = async (req : GachaRequest, res : Response): Promise<any> =>{
    const userId = req.userId;
    
    const { pullCount } = req.body;

    if (!pullCount || pullCount <= 0){
        return res.status(400).json({ message: "Invalid pull count requested" });
    }
    
    const itemsPulled : any = []
    const pulls : Partial<IPullHistory>[] = []

    try{
        const user = await User.findById(userId);

        if(!userId || !user)
        {
            return res.status(401).json({ message: "No User to pull for"});
        }
        console.log("I GOT HERE!");

        if(user.pull_currency < pullCount){
            console.log(user.pull_currency + " < " + pullCount);
            return res.status(402).json({ message: "Not enough coins to pull " + pullCount})
        }

        const items : IItem[] = await Item.find().lean();

        // Pulling
        console.log("Pulled " + pullCount);
        for (let i = 0; i < pullCount; i++){
            user.star_5_pity++;
            user.star_4_pity++;
            const {itemId, rarity} = rollGacha(items, user.star_5_pity, user.star_4_pity);
            
            if (rarity === 5){
                user.star_5_pity = 0;
            } else if (rarity === 4){
                user.star_4_pity = 0;
            }

            // Pull History
            pulls.push({
                userId: userId,
                itemId: itemId
            })

            itemsPulled.push({itemId});
            
            grantGachaItem(user, itemId);
        }
        console.log("Ended at");
        console.log("5 Star Pity Count: " + user.star_5_pity);
        console.log("4 Star Pity Count: " + user.star_4_pity);
        user.pull_currency -= pullCount;
        user.total_pullCount += pullCount;

        const savedPulls = await PullHistory.insertMany(pulls);
        await user.save();
        AddActivityLog(userId, "Pulled " + pullCount + " times." );

        res.status(200).json({
            "message": "You Win!",
            "itemsPulled": itemsPulled,
            "updatedCurrency": user.pull_currency,
            "star_5_pity" : user.star_5_pity,
            "star_4_pity" : user.star_4_pity,
            "updatedPullHistory" : savedPulls
        });
    } catch(error : any) {
        console.log(error.message);
    }   
}

export const getUserItems = async (req: Request, res: Response) =>{
    

    try{
        const { username } = req.params;

        if (!username){
            return res.status(404).json({message : "no account"});
        }
        
        const userInventory = await User.findOne({username}).select('inventory').lean();

        if (!userInventory){
            return res.status(404).json({message: "User not found"});
        }

        const { inventory } = userInventory || [];
        console.log(inventory);
        res.status(200).json(inventory);
    }
    catch(err: any){
        console.log(err.message);
    }
}

export const getPullHistory = async (req: GetPullHistoryRequest, res: Response) =>{
    const userId = req.userId;

    if (!userId){
        return res.status(401).json({message: "No user found"})
    }

    const page = parseInt(req.query.page as string) || 1;
    const itemsPerPage = 5;

    try{

        const totalPulls = await PullHistory.countDocuments({ userId: userId });
        const totalPages = Math.ceil(totalPulls / itemsPerPage) || 1;
        
        const userPullHistory = await PullHistory.find({ userId : userId })
        .sort({ timestamp: -1, _id : -1 })
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .lean();

        res.status(200).json({
            pullHistory: userPullHistory,
            totalPages: totalPages
        });
    }catch(err: any){
        console.log(err.message);
    }
}

export const getItems = async (req : Request, res : Response): Promise<void> =>{
    const items : IItem[] = await Item.find();
    console.log(req);
    try{
        res.status(200).json(JSON.stringify(items));
    } catch (err: any){
        res.status(400).json({message : err.message})
    }
}

export const addItem = async (req : ItemAddRequest, res : Response): Promise<void> =>{
    const newItem = new Item(req.body);

    try{
        await newItem.save();
        
        res.status(200).json({
            message: "Successfully added item to the database.",
            item: newItem
        });
    } catch (err: any){
        res.status(400).json({message : err.message})
    }
}

export const recycleItem = async (req: RecycleItemRequest, res: Response) => {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!userId){
        return res.status(400).json({message: "User not found"});
    }

    if (!itemId){
        return res.status(400).json({message: "Item not found or invalid."});
    }

    try {
        const item = await Item.findOne({ itemId: itemId });

        if (!item) return res.status(400).json({message: "Item doesn't exist"});
        
        const user = await User.findById(userId);

        if (!user) return res.status(401).json({message: "User not found"});

        const recycled_inventory_item = user.inventory.find(inventory_item => inventory_item.itemId === itemId);

        if (!recycled_inventory_item || recycled_inventory_item.quantity <= 0) return res.status(400).json({message: "Item doesn't exist"});

        recycled_inventory_item.quantity -= 1;

        user.markModified('inventory');

        user.pull_currency_fragment += item.recycle_currency;

        await user.save();

        res.status(200).json({
            message: "Recycling Success recycled item " + item.itemId,
            pull_currency_fragment: user.pull_currency_fragment
        })

    }catch (err: any){
        console.error(err.message);
    }
}

export const claimDaily = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const now = new Date();

    if (!userId) {
        return res.status(400).json({ message: "User not found."});
    }

    try{
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User doesn't exist."});
        }

        if (user.next_daily_claim < now){
            const nextMidnight = new Date(Date.UTC(
                now.getUTCFullYear(), 
                now.getUTCMonth(), 
                now.getUTCDate() + 1, 
                0, 0, 0
            ));

            if (user.plan_tier === "pro"){
                user.pull_currency += 15;
            } else if (user.plan_tier === "standard"){
                user.pull_currency += 5;
            }
            user.next_daily_claim = nextMidnight;

            await user.save();

            return res.status(200).json({ 
                message: "Success",
                pull_currency: user.pull_currency,
                daily_claim_date: user.next_daily_claim.getTime()
            })
        }

        return res.status(400).json({ message: "Invalid action."});
    } catch(err: any) {
        console.error(err.message);
        return res.status(404).json({ message: err.message});
    }
}