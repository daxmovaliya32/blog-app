import { Controller } from '@nestjs/common';
import { Body, Post,Get,Param } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { User } from 'src/models/user.interface';
import { userservice } from '../service/userservice.service';

@Controller('user')
export class UsercontrollerController {
    constructor(private readonly Userservice:userservice){}
    @Post('register')
    @FormDataRequest()
    async createUser(@Body() userdto:User) {
        return this.Userservice.creatuser(userdto);
    }

    @Get('search/:id')
    async findUserbyid(@Param('id') id:String) {
        return this.Userservice.finduser(id);
    }

    @Get('search')
    async findalluser() {
        return this.Userservice.findall();
    }
}

