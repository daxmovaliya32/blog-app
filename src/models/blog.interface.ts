import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import * as paginate from "mongoose-paginate-v2";
import { User } from './user.interface';

export type BlogDocument = Blog & Document;
@Schema({timestamps:true,collection:"blogs"})
export class Blog {
  @Prop()
  @IsNotEmpty()
  title: String;

  @Prop()
  @IsNotEmpty()
  slug: string;

  @Prop()
  @IsNotEmpty()
  description: string;

  @Prop()
  @IsNotEmpty()
  body: string;
  
  @Prop({default:0})
  like:number;

  @Prop({type:String})
  @IsNotEmpty()
  headerimage:any;

  @Prop({default:null})
  publishdate:Date;

  @Prop()
  @IsNotEmpty()
  ispublish:Boolean;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  author:User;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.plugin(paginate);