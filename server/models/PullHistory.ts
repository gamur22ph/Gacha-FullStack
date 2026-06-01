import { Schema, model, Document, Types } from 'mongoose';

export interface IPullHistory extends Document{
    userId: string | Types.ObjectId,
    itemId: string,
    bannerId: string,
    timestamp: Date
}

const pullHistorySchema = new Schema({
    userId: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
    itemId: {type: String, require: true},
    bannerId: {type: String, require: true, default: "featured"},
    timestamp: {type: Date, default: Date.now}
})

export const PullHistory = model<IPullHistory>('PullHistory', pullHistorySchema);