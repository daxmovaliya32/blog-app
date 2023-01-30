import { Controller,UseGuards } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { User } from 'src/models/user.interface';
import { authUser } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class authController {
    constructor(private readonly Authservice:AuthService){}

    @Post('signin')
    @FormDataRequest()
    async loginuser(@Body() userdto:authUser) {
        return this.Authservice.signinuser(userdto.email,userdto.password);
    }

    @Post('signup')
    @FormDataRequest()
    async regUser(@Body() userdto:User) {
        return this.Authservice.signupuser(userdto);
    }
}
