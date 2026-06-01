import { type IItem } from "../models/Item.ts";
import { User, type IUser } from "../models/User.ts";

const RARITY_RATES = {
  SSR: 0.01, // 1.0% chance
  SR:  0.065, // 6.5% chance
  R:   0.925  // 92.5% chance (Remainder)
};

export const rollGacha = (items: IItem[], star_5_pity : number, star_4_pity : number): IItem => {
    const rarity_roll = Math.random();

    let chosenRarity: 5 | 4 | 3 = 3

    // GUARANTEED 50 PULLS
    if (star_5_pity >= 50 || rarity_roll <= RARITY_RATES.SSR) {
        chosenRarity = 5;
        console.log("got 5 star at " + star_5_pity + " pity");
    } else if (star_4_pity >= 10 || rarity_roll <= (RARITY_RATES.SSR + RARITY_RATES.SR)) {
        chosenRarity = 4;
        console.log("got 4 star at " + star_4_pity + " pity");
    } else {
        chosenRarity = 3;
    }
    
    const items_list : IItem[] = items.filter(item => item.rarity === chosenRarity);
    const randomIndex = Math.floor(Math.random() * items_list.length);
    if (items_list[randomIndex]) return items_list[randomIndex];

    // Simple Gacha
    //
    // const totalWeight = items.reduce((sum: number, item) => sum + item.rollWeight, 0);
    // const roll = Math.floor(Math.random() * totalWeight) + 1;
    // console.log("ROLLING!")
    // console.log(totalWeight);
    // console.log(roll)
    // let currentWeightSum = 0;
    // for (const item of items) {
    //     currentWeightSum += item.rollWeight;
    //     if (roll <= currentWeightSum) {
    //     return item; 
    //     }
    // }

    throw new Error("Cannot roll gacha from an empty item pool");
}

export const grantGachaItem = (user : IUser, wonItemId: string) => {
    // 1. Check if the user already has this specific itemId in their inventory
    const existingItem = user.inventory.find(item => item.itemId.toString() === wonItemId.toString());

    if (existingItem) {
        // Scenario 1: They already own it -> Increment quantity by 1
        existingItem.quantity += 1;
    } else {
        user.inventory.push({
            itemId: wonItemId,
            quantity: 1
        })
    }
}