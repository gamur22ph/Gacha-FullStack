import { ActivityLog } from "../models/ActivityLog.js"

export const AddActivityLog = (userId : string, activity_log_description: string) => {
    ActivityLog.create({
        userId: userId,
        activity_description: activity_log_description
    }).then(() => {
        console.log("ActivityLogsUtils.ts:9 - Added Log to the user.");
    }).catch((err: any) => {
        console.error(err.message);
    });
}