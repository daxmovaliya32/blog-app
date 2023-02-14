import {IsNumber, IsOptional, IsString } from "class-validator"

export class filterdto
{
    @IsString()
    username:String

    @IsString()
     page:string
    
    @IsString()
     limit:string
}