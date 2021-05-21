import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
declare class User extends Document {
    _id: mongoose.Types.ObjectId;
}
export declare type NotificationDocument = Notification & Document;
export declare class Notification {
    userFrom: User;
    message: string;
    userTo: User;
    linkId: mongoose.Types.ObjectId;
}
export declare const NotificationSchema: mongoose.Schema<Document<Notification, any>, mongoose.Model<any, any, any>, undefined>;
export {};
