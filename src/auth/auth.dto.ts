import { IsEmail, IsNotEmpty, Matches } from "class-validator";


export class forgotpassword {
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    newpassword:string;

    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    confirmnewpassword:string;
}

export class emailforsendotp {
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class verifingotp {
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    otp:number;
}