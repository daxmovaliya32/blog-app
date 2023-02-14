import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.interface';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from 'src/helper/cloudinary/cloudinary.module';
import { BlogController } from './blog.controller';
import { Blogservice } from './blog.service';
import { RolesGuarduser } from 'src/guard/roles.guard';
import { jwtstrategy } from 'src/strategy/jwt.strategy';
import { BlogSchema } from 'src/models/blog.interface';
import { MailerModule } from '@nestjs-modules/mailer';
// import { UserModule } from 'src/user/user.module';

@Module({
  imports:[CloudinaryModule,ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
    MongooseModule.forFeature([{name:'Blog',schema:BlogSchema}]),
    NestjsFormDataModule,JwtModule.register({
       secret:process.env.jwtsecret,
  })],
  providers: [Blogservice,jwtstrategy,RolesGuarduser],
  controllers:[BlogController]
})
export class BlogModule {}