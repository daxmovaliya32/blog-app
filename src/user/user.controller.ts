import { Controller } from '@nestjs/common';
import { Body, Post,Get,Param,Request } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { User } from 'src/models/user.interface';
import { userservice } from './user.service';

@Controller('user')
export class UsercontrollerController {
    constructor(private readonly Userservice:userservice){}
    
    @Get('search/:id')
    async findUserbyid(@Param('id') id:String) {
        return this.Userservice.finduser(id);
    }

    @Get('search')
    async findalluser() {
        return this.Userservice.findall();
    }
}

