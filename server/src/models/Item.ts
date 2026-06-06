import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
    itemId : string;
    rarity : number;
    recycle_currency: number;
}

const itemSchema = new Schema({
    itemId: { type: String, required: true, unique: true},
    rarity : {type : Number, required: true, min: 1, max: 5},
    recycle_currency: {type: Number, required: true, default: 0},
});

export const Item = model<IItem>('Item', itemSchema);