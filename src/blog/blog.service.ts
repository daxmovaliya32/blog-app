import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CloudinaryService } from 'src/helper/cloudinary/cloudinary.service';
import { Blog, BlogDocument } from 'src/models/blog.interface';
import { User, UserDocument } from 'src/models/user.interface';

@Injectable()
export class Blogservice {
    constructor(
        @InjectModel(Blog.name) private readonly blogModel:Model<BlogDocument>,
        @InjectModel(Blog.name) private readonly blogmodelpag:PaginateModel<BlogDocument>,
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
        private readonly cloudinary:CloudinaryService
    ){}

    //create blog and add to users blogentries
    async addblog(req:any,blogdto:Blog)
    {
        const response = await this.cloudinary.uploadImage(blogdto.headerimage).catch((error) => {
            console.log(error);
          throw new BadRequestException(error.message);
        });
        let publishdate;

        if(String(blogdto.ispublish)==="true")
        {
            publishdate=Date.now()
        }else{
            publishdate=null;
        }
        
         const blogdata = await this.blogModel.create({
            title:blogdto.title,
            slug:blogdto.slug,
            description:blogdto.description,
            headerimage:response.secure_url,
            author:req.user._id,
            publishdate:publishdate,
            body:blogdto.body,
            ispublish:blogdto.ispublish
         })
         const alldata=await blogdata.save();
        await this.userModel.findByIdAndUpdate({_id:req.user._id},{$push:{blogentries:{_id:alldata._id}}})
         return alldata.populate("author","-password -blogentries -role");
    }

    //find blog by id
    async findblog (id:number)
    {
      return await this.blogModel.findOne({_id:id}).populate("author","-password -blogentries -role");
    }

    //list of all blogs which is published by user
    async findblogs()
    {
      return await this.blogModel.find({ispublish:true}).populate("author","-password -blogentries -role");
    }

    //for finding particular user's blog
    async findblogsofuser(userid:number)
    {
        return (await this.blogModel.find({author:{$eq:{_id:userid}}}).populate("author","-password -blogentries -role"));
    }

    //for delete blog
    async deleteblog(req:any,id:number)
    {
        await this.blogModel.findByIdAndDelete({_id:id});
        await this.userModel.findByIdAndUpdate({_id:req.user._id},{$pull:{blogentries:id}})
        return {message:"blog deleted successfully"};
    }


    //update blog data --- title,image,desc,body,slug
    async updateblog(req:any,id:string,blogdto:any)
    {
      if(blogdto.title!=null)
      {
        await this.blogModel.findByIdAndUpdate({_id:id},{title:blogdto.title},{new:true})
        await this.userModel.findByIdAndUpdate({_id:req.user._id,blogentries:id},{$set:{title:blogdto.title}},{new:true})
      }
      if(blogdto.slug!=null)
      {
        await this.blogModel.findByIdAndUpdate({_id:id},{slug:blogdto.slug},{new:true})
        await this.userModel.findByIdAndUpdate({_id:req.user._id,blogentries:id},{$set:{slug:blogdto.slug}},{new:true})
      }
      if(blogdto.description!=null)
      {
        await this.blogModel.findByIdAndUpdate({_id:id},{description:blogdto.description},{new:true})
        await this.userModel.findByIdAndUpdate({_id:req.user._id,blogentries:id},{$set:{description:blogdto.description}},{new:true})
      }
      if(blogdto.body!=null)
      {
        await this.blogModel.findByIdAndUpdate({_id:id},{body:blogdto.body},{new:true})
        await this.userModel.findByIdAndUpdate({_id:req.user._id,blogentries:id},{$set:{body:blogdto.body}},{new:true})
      }
      if(blogdto.headerimage!=null)
      {
        const image = await this.cloudinary.uploadImage(blogdto.headerimage).catch((error) => {
        throw new BadRequestException(error.message);    
      });
        await this.blogModel.findByIdAndUpdate({_id:id},{headerimage:image.secure_url},{new:true})
        await this.userModel.findByIdAndUpdate({_id:req.user._id,blogentries:id},{$set:{headerimage:image.secure_url}},{new:true})
      }
        return {message:"blog updated successfully"};
    }

}
