import { BadRequestException, Injectable } from '@nestjs/common';
import {User, UserDocument, UserSchema} from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { resetpassword, updaterole, updateusername } from './user.dto';
import { encryptpassword, verifypassword } from 'src/helper/password.helper';
import { CloudinaryService } from 'src/helper/cloudinary/cloudinary.service';
import { Blog, BlogDocument } from 'src/models/blog.interface';
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

@Injectable()
export class userservice {
    constructor(
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
        @InjectModel(Blog.name) private readonly blogModel:Model<BlogDocument>,
        @InjectModel(User.name) private readonly usermodelpag:PaginateModel<UserDocument>,
        private readonly cloudinary:CloudinaryService
    ){}

    // for search user by id
    async finduser(id:string):Promise<Blog[]>
    {
        try {
            return await this.userModel.findById({_id:id}).populate("blogentries")
        } 
        catch (error) {
        console.log(error);
        }
    }

    // list all users
    async findall(page:number,limit:number):Promise<any>
    {       
     const options = {
        page: Number(page),
        limit:Number(limit),
        customLabels: myCustomLabels,
      };
      UserSchema.plugin(mongoosePaginate)
       return this.usermodelpag.paginate({},options)
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
            return this.userModel.findByIdAndUpdate({_id:id},{role:role.role},{new:true});
        } 
        catch (error) {
        console.log(error);
        }
    }

    async updateprofile(req:any) {
        const res = await this.cloudinary.uploadImage(req.file).catch((error) => {
            console.log(error);
          throw new BadRequestException(error.message);    
        });
        return await this.userModel.findByIdAndUpdate({_id:req.user._id},{image:res.secure_url},{new:true});
      }


}
