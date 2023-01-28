import { Module } from '@nestjs/common';
import { userservice } from '../service/userservice.service';
import { UsercontrollerController } from '../controller/usercontroller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/models/user.interface';
import { NestjsFormDataModule } from 'nestjs-form-data/dist/nestjs-form-data.module';

@Module({
  imports: [NestjsFormDataModule,MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [userservice],
  controllers: [UsercontrollerController]
})
export class UserModule {}
