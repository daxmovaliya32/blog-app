import { BadRequestException, Injectable, Param } from '@nestjs/common';
import {User, UserDocument, UserSchema} from '../models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { resetpassword, updaterole, updateusername } from './user.dto';
import { encryptpassword, verifypassword } from 'src/helper/password.helper';
import { CloudinaryService } from 'src/helper/cloudinary/cloudinary.service';
import { Blog, BlogDocument } from 'src/models/blog.interface';
import { filterdto } from './filter.dto';
import { AnyARecord } from 'dns';
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
            return await this.userModel.findOne({_id:id,isDeleted:false,isemailverified:true}).populate("blogentries")
        } 
        catch (error) {
        console.log(error.message);
        throw new BadRequestException(error.message);
        
        }
    }

    // list all users
    async findall(query:filterdto):Promise<any>
    {      
        let finduser;
        if(query.username != null)
        {
            finduser= this.userModel.find({isDeleted:false, 
                $or:[{username:{$regex:query.username,$options:"i"},
                email:{$regex:query.username,$options:"i"}}]
        }).populate("blogentries")   
        }else{
            finduser= await this.userModel.find({isDeleted:false})
        }
        const options = {
        page: Number(query.page) || 1,
        limit:Number(query.limit) || 10,
        customLabels: myCustomLabels,
      };
      
       return this.usermodelpag.paginate(finduser,options)
    }
    
    // for update user 
    async updateuser(req:any,updatedata:updateusername)
    {   
        try {
            const check = await this.userModel.findByIdAndUpdate({_id:req.user._id,isDeleted:false,isemailverified:true},{name:updatedata.name},{new:true});
            if(!check)
            {
                return {message:"user not found...."}
            }
            return check;
        } 
        catch (error) {
        console.log(error);
        }
    }

    // for delete user by id
    async deleteusers(id:string)
    {
        try{
            const check= await this.userModel.findByIdAndUpdate({_id:id,isDeleted:false,isemailverified:true},{isDeleted:true},{new:true});
            if(!check)
            {
                return {message:"user not found...."}
            }
            return check;
        } 
        catch (error) {
        console.log(error);
        }
    }

    // for reset user password
    async resetpassword(req:any,resetpass:resetpassword)
    {
        try {
            const userdata = await this.userModel.findOne({_id:req.user._id,isDeleted:false,isemailverified:true});
            if(!userdata)
            {
                return {message:"user not found..."}
            }
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
            const check = await this.userModel.findByIdAndUpdate({_id:id,isDeleted:false,isemailverified:true},{role:role.role},{new:true});
            if(!check)
            {
                return {message:"user not found...."}
            }
            return check;
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
        const uploadimage = await this.userModel.findByIdAndUpdate({_id:req.user._id,isDeleted:false,isemailverified:true},{image:res.secure_url},{new:true});
        if(!uploadimage)
        {
            return {message:"user not found ....."}
        }
        return uploadimage;
      }
}
