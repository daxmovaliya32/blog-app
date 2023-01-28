import { Injectable } from '@nestjs/common';
import {User, UserDocument} from '../../models/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userdto } from '../userdto/user.dto';

@Injectable({})
export class userservice {
    constructor(
        @InjectModel('User') private readonly userModel:Model<UserDocument>
    ){}
    async creatuser(user:userdto):Promise<userdto>{
            try {
            const newUser = new this.userModel(user);
            return newUser.save();
        }
        
     catch (error) {
        console.log(error);
        
    }
}
}
