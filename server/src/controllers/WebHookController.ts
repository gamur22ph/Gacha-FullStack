import type {Request, Response } from "express";
import Stripe from "stripe";
import { User, type PlanTierType, type SubscriptionStatusType } from "../models/User.js";
import { AddActivityLog } from "../utils/ActivityLogsUtils.js";



export const handleStripeWebHook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event: Stripe.Event;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

    try {
        // Cryptographically checks if the payload comes from Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`❌ Webhook signature verification failed:`, err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event types using type narrowing
    switch (event.type) {
        case 'checkout.session.completed': {
        // Cast the generic event object safely to a Checkout Session type
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        const user = await User.findById(userId);

        if (!userId){
            return res.status(400).json({message : "User not found."})
        }
        
        if (user?.is_first_time_subscription){
            user.pull_currency += 10;
            user.is_first_time_subscription = false;
            user.save();
        }

        if (user) {
            await user.updateOne({
                stripe_customer_id: session.customer as string,
                subscription_id: session.subscription as string,
                subscription_status: 'active' as SubscriptionStatusType,
                plan_tier: 'pro' as PlanTierType
            });
            console.log(`✨ Mock subscription activated for user: ${userId}`);

            AddActivityLog(userId, "Activated Pro.");
            return res.json({
                received: true,
            });
        }
        break;
        }

        case 'customer.subscription.deleted': {
        // Cast the generic event object safely to a Subscription object type
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const user = await User.findOneAndUpdate({ stripeCustomerId: customerId }, {
            subscription_status: 'none' as SubscriptionStatusType,
            plan_tier: 'standard' as PlanTierType
        });
        console.log(`ℹ️ Mock subscription canceled for customer: ${customerId}`);

        if (user){
            AddActivityLog(user._id.toString(), "Removed Subscription.");
        }
       
        return res.json({
            received: true,
        });
        }

        default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
}