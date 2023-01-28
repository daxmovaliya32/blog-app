import { Injectable } from '@nestjs/common';
import {User, UserDocument} from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable({})
export class userservice {
    constructor(
        @InjectModel('User') private readonly userModel:Model<UserDocument>
    ){}
    // for usercreation
    async creatuser(user:User):Promise<User>
    {
        try {
            const newUser = new this.userModel(user);
            return newUser.save();
        } 
        catch (error) {
        console.log(error);
        }
    }

    // for search user by id
    async finduser(id:String):Promise<User>
    {
        try {
            return this.userModel.findOne({_id:id});
        } 
        catch (error) {
        console.log(error);
        }
    }

    // list all users
    async findall():Promise<User[]>
    {
        try {
            return this.userModel.find();
        } 
        catch (error) {
        console.log(error);
        }
    }
}
