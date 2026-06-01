export type SubscriptionStatusType = 'active' | 'past_due' | 'none'
export type PlanTierType = 'standard' | 'pro'

export interface UserData{
    username : string,
    email : string,
    pull_currency : number,
    pull_currency_fragment: number,
    total_pullCount : number,
    star_5_pity : number,
    star_4_pity : number,
    subscription_status: SubscriptionStatusType,
    plan_tier: PlanTierType,
    claim_date: number
}