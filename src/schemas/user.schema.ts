import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

class ParentChild extends Document {
  @Prop()
  _id: mongoose.Types.ObjectId;
}

class Child extends Document {
  @Prop()
  name: string;
  age: number;

  @Prop()
  parent: ParentChild;
}

class Parent extends Document {
  @Prop()
  name: string;
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  child: Child;

  @Prop()
  parent: Parent;
}

export const UserSchema = SchemaFactory.createForClass(User);
