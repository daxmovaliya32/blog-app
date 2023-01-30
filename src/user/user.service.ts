import { Injectable } from '@nestjs/common';
import {User, UserDocument} from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { resetpassword, updateusername } from './user.dto';
import { encryptpassword, verifypassword } from 'src/helper/password.helper';
import { request } from 'express';

@Injectable({})
export class userservice {
    constructor(
        @InjectModel('User') private readonly userModel:Model<UserDocument>
    ){}

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
    
    // for update user 
    async updateuser(req:any,updatedata:updateusername)
    {   
        try {
            return this.userModel.findByIdAndUpdate({_id:req.user._id},{name:updatedata.name},{new:true});
        } 
        catch (error) {
        console.log(error);
        }
    }

    // for delete user by id
    async deleteuser(id:string)
    {
        try {
            return this.userModel.deleteOne({_id:id});
        } 
        catch (error) {
        console.log(error);
        }
    }

    // for reset user password
    async resetpassword(req:any,resetpass:resetpassword)
    {
        try {
            const userdata = await this.userModel.findOne({_id:req.user._id});
            
            const check = await verifypassword(resetpass.oldpassword,userdata.password);
            const bcryptpass = await encryptpassword(resetpass.newpassword);
            if(!check)
            {
                return {message:"password is not correct"}
            }
            return this.userModel.findByIdAndUpdate({_id:req.user._id},{password:bcryptpass},{new:true});
        } 
        catch (error) {
        console.log(error);
        }
    }
}
