import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

class User extends Document {
  @Prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  name: string;
}

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userFrom: User;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  userTo: User;

  @Prop({ required: true })
  linkId: mongoose.Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
