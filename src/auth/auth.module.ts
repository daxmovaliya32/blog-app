import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { authController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.interface';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from 'src/helper/cloudinary/cloudinary.module';

@Module({
  imports:[CloudinaryModule,ConfigModule.forRoot({isGlobal:true}),NestjsFormDataModule,JwtModule.register({
       secret:process.env.jwtsecret,
  }) ,PassportModule,MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [AuthService],
  controllers:[authController]
})
export class AuthModule {}
