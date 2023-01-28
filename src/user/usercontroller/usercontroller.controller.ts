import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { FormDataRequest } from 'nestjs-form-data';
import { userdto } from '../userdto/user.dto';
import { userservice } from '../userservice/userservice.service';

@Controller('user')
export class UsercontrollerController {
    constructor(private readonly Userservice:userservice){}
    @Post('register')
    @FormDataRequest()
    async createUser(@Body() userdto:userdto) {
        return this.Userservice.creatuser(userdto);
    }
}
