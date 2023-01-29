import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { encryptpassword, verifypassword } from '../helper/password.helper';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel:Model<UserDocument>,
        private readonly jwtService:JwtService
    ){}


    async signinuser(email:string,password:string)
    {
        try{      
            const check = await this.userModel.findOne({email:email});
            if(!check)
            {
                return {message:"email not exist in database"}
            }

            const ispassword = await verifypassword(password,check.password);
            
            if(!ispassword)
            {
                return {message:"password is not correct"}
            }
            
            const token = this.jwtService.sign(JSON.stringify(check))
            
            return {token,check};
        
        } catch (error) {
            console.log(error);
            
        }
   }


   async signupuser(user:User)
   {  
       const emailexist =await this.userModel.findOne({email:user.email});
       const usernameexist =await this.userModel.findOne({username:user.username});
       if(emailexist)
       {
          return{ message: "this email is already exist"}    
       }
       if(usernameexist)
       {
          return{ message: "this username is already exist"}    
       }
       const pass = await encryptpassword(user.password)

           const newUser = new this.userModel({
               name:user.name,
               email:user.email,
               username:user.username,
               password:pass          
           });
           return newUser.save();
   }
   
}
