import { Controller} from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { User } from 'src/models/user.interface';
import { authUser, verifydto } from 'src/user/user.dto';
import { emailforsendotp, forgotpassword, verifingotp} from './auth.dto';
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

    @Post('signup/verify')
    @FormDataRequest()
    async verifyotp(@Body() data:verifydto) {
        return this.Authservice.verify(data);
    }

    @Post('/email')
    @FormDataRequest()
    async emailforforgotpassword(@Body() userdto:emailforsendotp) {
        return this.Authservice.findemailandsaveotp(userdto);
    }

    @Post('/email/verify')
    @FormDataRequest()
    async verifyotpforforgotpassword(@Body() userdto:verifingotp) {
        return this.Authservice.otpverificationforforgotpassword(userdto);
    }

    @Post('/email/verify/changepassword')
    @FormDataRequest()
    async chan(@Body() userdto:forgotpassword) {
        return this.Authservice.changepassword(userdto);
    }
}
