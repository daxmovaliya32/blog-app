import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { RolesGuardadmin, RolesGuardforadminanduser, RolesGuarduser } from 'src/guard/roles.guard';
import { Blog } from 'src/models/blog.interface';
import { Blogservice } from './blog.service';
import { blogfilterdto } from './blogfilter.dto';

@Controller('user/blog')
export class BlogController {
   constructor(
    private readonly blogservice:Blogservice){}

    @Post('addblog')
    @UseGuards(RolesGuardforadminanduser)
    @FormDataRequest()
    async userblog(@Req() req:RolesGuarduser,@Body() blogdto:Blog) {
        return this.blogservice.addblog(req,blogdto);
    }

    @Get('findblog/:id')
    @UseGuards(RolesGuardforadminanduser)
    @FormDataRequest()
    async findblogbyblogid(@Param('id') id:number) {
        return this.blogservice.findblog(id);
    }

    @Get('findallblog')
    @UseGuards(RolesGuardforadminanduser)
    async findallblog(@Query() query:blogfilterdto) {
        return this.blogservice.findblogs(query);
    }

    @Get('finduserblog/:id')
    @UseGuards(RolesGuarduser)
    async findblogsbyuser(@Param('id') id:number) {
        return this.blogservice.findblogsofuser(id);
    }

    @Delete('deleteblog/:id')
    @UseGuards(RolesGuardforadminanduser)
    async deleteblogofuser(@Req() req:RolesGuarduser,@Param('id') id:number) {
        return this.blogservice. deleteblog(req,id);
    }

    @Patch('updateblog/:id')
    @UseGuards(RolesGuarduser)
    @FormDataRequest()
    async updateblogofuser(@Req() req:RolesGuarduser,@Param('id') id:string,@Body() blogdto:any) {
        return this.blogservice.updateblog(req,id,blogdto)
    }

}


