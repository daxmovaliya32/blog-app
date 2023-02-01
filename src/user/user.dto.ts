import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";

enum role {
    ADMIN='admin',
    USER='user',
    EDITOR='editor',
    CHIEFEDITOR='chiefeditor'
 }

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

export class updaterole {
  
    @IsEnum(role)
    role:role;
}
