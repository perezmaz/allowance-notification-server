import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
declare class ParentChild extends Document {
    _id: mongoose.Types.ObjectId;
}
declare class Child extends Document {
    name: string;
    age: number;
    parent: ParentChild;
}
declare class Parent extends Document {
    name: string;
}
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    role: string;
    child: Child;
    parent: Parent;
}
export declare const UserSchema: mongoose.Schema<Document<User, any>, mongoose.Model<any, any, any>, undefined>;
export {};
