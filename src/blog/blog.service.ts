import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CloudinaryService } from 'src/helper/cloudinary/cloudinary.service';
import { Blog, BlogDocument } from 'src/models/blog.interface';
import { User, UserDocument } from 'src/models/user.interface';
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
export class Blogservice {
    constructor(
        @InjectModel(Blog.name) private readonly blogModel:Model<BlogDocument>,
        @InjectModel(Blog.name) private readonly blogmodelpag:PaginateModel<BlogDocument>,
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
        private readonly cloudinary:CloudinaryService
    ){}

    async addblog(req:any,blogdto:Blog)
    {
        const response = await this.cloudinary.uploadImage(blogdto.headerimage).catch((error) => {
            console.log(error);
          throw new BadRequestException(error.message);
        });
         const blogdata = await this.blogModel.create({
            title:blogdto.title,
            slug:blogdto.slug,
            description:blogdto.description,
            headerimage:response.secure_url,
            author:req.user._id,
            body:blogdto.body
         })
         const alldata=await blogdata.save();
        await this.userModel.findByIdAndUpdate({_id:req.user._id},{$push:{blogentries:alldata._id}})
         return alldata.populate("author","-password");
    }
}
