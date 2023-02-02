import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,ConfigModule.forRoot({isGlobal:true}),MongooseModule.forRoot(process.env.url), UserModule,BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
