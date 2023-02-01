import { Injectable } from '@nestjs/common';
import {User, UserDocument, UserSchema} from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { resetpassword, updaterole, updateusername } from './user.dto';
import { encryptpassword, verifypassword } from 'src/helper/password.helper';
const mongoosePaginate = require('mongoose-paginate-v2');

const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  };
  
  const options = {
    page: 1,
    limit:4,
    customLabels: myCustomLabels,
  };

@Injectable({})
export class userservice {
    constructor(
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
        @InjectModel(User.name) private readonly usermodelpag:PaginateModel<UserDocument>
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
    async findall():Promise<any>
    {     
       const user = await this.usermodelpag.paginate(UserSchema.plugin(mongoosePaginate),options)
       return user;
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
    async deleteusers(id:string)
    {
        try {
            return this.userModel.findByIdAndDelete({_id:id});
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

    async updaterole(id:string,role:updaterole)
    {
        try {
            console.log(role);
            
            const userdata = await this.userModel.findOne({_id:id});
            return this.userModel.findByIdAndUpdate({_id:id},{role:role.role},{new:true});
        } 
        catch (error) {
        console.log(error);
        }
    }
}
