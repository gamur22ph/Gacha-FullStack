import type { Response } from "express";
import Stripe from "stripe";
import type { AuthenticatedRequest } from "../utils/AuthMiddleware.ts";
import { User } from "../models/User.ts";
import { AddActivityLog } from "../utils/ActivityLogsUtils.ts";



interface MockCheckOutRequest extends AuthenticatedRequest {
    body: {
        priceId : string
    }
}

export const mockCheckOut = async (req: MockCheckOutRequest, res: Response) : Promise<any> => {
    const { priceId } = req.body;
    const userId = req.userId;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    if (!userId){
        return res.status(400).json({ message: 'User not found.' });
    }

    if (!priceId){
        return res.status(400).json({ message: 'Price ID is required'});
    }

    try{
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/subscription`,
            metadata: { 
                userId: userId
            },
        })

        res.json({ url: session.url });
    }
    catch (err: any){
        res.status(500).json({ message: err.message });
    }
}

export const cancelSubscription = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const userId = req.userId;

    const { cancelImmediately } = req.body;

    if (!userId){
        console.log("user not found");
        return res.status(400).json({message: "User does not exist."});
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    try {
        const user = await User.findById(userId);
        if (!user || !user.subscription_id) {
            console.log("No active subscription found for this user");
            return res.status(400).json({ message: "No active subscription found for this user." });
        }

        if (cancelImmediately){
            await stripe.subscriptions.cancel(user.subscription_id);
            console.log("Canceled Successfully");
            AddActivityLog(userId, `Requested subscription cancellation.`);
            return res.status(200).json({ 
                message: "Subscription cancellation initiated successfully."
            });
        }
        else{
            await stripe.subscriptions.update(user.subscription_id, {
                cancel_at_period_end: true
            });
            console.log("Canceled at period end Successfully");
            AddActivityLog(userId, `Requested subscription cancellation for this period.`);
            return res.status(200).json({ 
                message: "Subscription cancellation initiated successfully."
            });
        }
    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
    }
};
