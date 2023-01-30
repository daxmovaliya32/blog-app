import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class authUser {
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(4)
    password: string;
  
  }

export class resetpassword {
  
    @IsNotEmpty()
    oldpassword: string;
  
    @IsNotEmpty()
    newpassword:string;
}

export class updateusername {
  
    @IsNotEmpty()
    name: string;
  
}