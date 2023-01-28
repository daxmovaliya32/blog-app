import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({timestamps:true,collection:"users"})
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

}

export const UserSchema = SchemaFactory.createForClass(User);