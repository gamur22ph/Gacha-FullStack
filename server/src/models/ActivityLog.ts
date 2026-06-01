import { Schema, model, Document, Types } from 'mongoose';

export interface IActivityLog extends Document{
    userId: string | Types.ObjectId,
    activity_description: string,
    timestamp: Date
}

const activityLogSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
    activity_description: {type: String, require: true},
    timestamp: {type: Date, default: Date.now}
})

export const ActivityLog = model<IActivityLog>('ActivityLog', activityLogSchema);