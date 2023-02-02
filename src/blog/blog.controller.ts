import { Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { RolesGuarduser } from 'src/guard/roles.guard';
import { Blog } from 'src/models/blog.interface';
import { Blogservice } from './blog.service';

@Controller('user/blog')
export class BlogController {
   constructor(
    private readonly blogservice:Blogservice){}

    @Post('addblog')
    @UseGuards(RolesGuarduser)
    @FormDataRequest()
    async userblog(@Req() req:RolesGuarduser,@Body() blogdto:Blog) {
        return this.blogservice.addblog(req,blogdto);
    }
}


