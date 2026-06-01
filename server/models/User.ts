import { Schema, model, Document } from 'mongoose';
import { hash } from 'bcryptjs';

interface IUserInventoryItem {
  itemId: string;
  quantity: number;
}

export type SubscriptionStatusType = 'active' | 'past_due' | 'none'
export type PlanTierType = 'standard' | 'pro'

export interface IUser extends Document {
    username : string;
    username_canonical : string;
    email : string;
    password : string;
    email_verified : boolean;
    is_guest : boolean;
    star_5_pity : number;
    star_4_pity : number;
    total_pullCount : number;
    pull_currency : number;
    pull_currency_fragment: number;
    inventory: IUserInventoryItem[];
    stripe_customer_id: string;
    subscription_status: SubscriptionStatusType;
    subscription_id: string;
    plan_tier: PlanTierType;
    is_first_time_subscription: boolean;
    next_daily_claim: Date;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    username_canonical: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email_verified: {type: Boolean, default: false},
    is_guest : {type: Boolean, default: false},
    star_5_pity: {type: Number, required: true, default: 0},
    star_4_pity: {type: Number, required: true, default: 0},
    total_pullCount: {type: Number, required: true, default: 0},
    pull_currency : {type: Number, required: true, default: 20},
    pull_currency_fragment : {type: Number, default: 0},
    inventory: {
        type: [{
            itemId: { type : String, required: true},
            quantity: { type : Number, required: true, default : 1}
        }],
        default: []
    },
    stripe_customer_id: {type: String, default: ''},
    subscription_status: {type: String, default: 'none'},
    subscription_id: {type: String, default: ''},
    plan_tier: {type: String, default: 'standard'},
    is_first_time_subscription: {type: Boolean, default: true},
    next_daily_claim: {type: Date, default: Date.now}
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try {
        const saltRounds = 12;
        this.password = await hash(this.password, saltRounds);
    } catch (error: any) {
        throw new Error('Hashing failed');
    }
})

export const User = model<IUser>('User', userSchema)