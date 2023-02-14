import {IsNumber, IsOptional, IsString } from "class-validator"

export class blogfilterdto
{
    @IsString()
    blogname:String

    @IsString()
     page:string
    
    @IsString()
     limit:string
}