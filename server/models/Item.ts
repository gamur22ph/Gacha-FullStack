import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
    itemId : string;
    rarity : number;
    price : number;
    recycle_currency: number;
    rollWeight : number;
}

const itemSchema = new Schema({
    itemId: { type: String, required: true, unique: true},
    rarity : {type : Number, required: true, min: 1, max: 5},
    price: {type: Number, required: true, default : 0},
    recycle_currency: {type: Number, required: true, default: 0},
    rollWeight: {type: Number, required: true}
});

export const Item = model<IItem>('Item', itemSchema);