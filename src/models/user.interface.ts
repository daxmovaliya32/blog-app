import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import * as paginate from "mongoose-paginate-v2";
import { Blog } from './blog.interface';

export type UserDocument = User & Document;
@Schema({timestamps:true,collection:"users"})
export class User {
  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsNotEmpty()
  username: string;

  @Prop()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;
  
  @Prop({default:"user"})
  role:String;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Blog'})
  blogentries:Blog[];

  @Prop({type:String})
  @IsNotEmpty()
  image:any;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(paginate);
