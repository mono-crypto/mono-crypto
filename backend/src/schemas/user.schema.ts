import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  google_id: number;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  picture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
