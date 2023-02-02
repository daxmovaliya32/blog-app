import { Controller, Delete, Patch,Query,UploadedFile,UploadedFiles,UseGuards, UseInterceptors} from '@nestjs/common';
import { Body,Get,Param,Request } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';
import { RolesGuardadmin, RolesGuarduser } from 'src/guard/roles.guard';
import { resetpassword, updaterole, updateusername } from './user.dto';
import { userservice } from './user.service';

@Controller('user')
export class UsercontrollerController {
    constructor(private readonly Userservice:userservice){}
    
    @UseGuards(RolesGuarduser)
    @Get(':id')
    async findUserbyid(@Param('id') id:String) {
        return this.Userservice.finduser(id);
    }
    
    @UseGuards(RolesGuardadmin)
    @Get()
    async findalluser(@Query('limit') limit:number,@Query('page') page:number){
        console.log(page);
        
        return this.Userservice.findall(page,limit);
    }

    @UseGuards(RolesGuarduser)
    @Patch('updateusername')
    @FormDataRequest()
    async updateusersname(@Request() req:RolesGuarduser,@Body() updatedata:updateusername) {
        return this.Userservice.updateuser(req,updatedata);
    }

    @UseGuards(RolesGuardadmin)
    @Delete('deleteuser/:id')
    async deleteuserbyid(@Param('id') id:string) {
        return this.Userservice.deleteusers(id);
    }

    @UseGuards(RolesGuarduser)
    @Patch('resetpassword')
    @FormDataRequest()
    async userresetpassword(@Request() req:RolesGuarduser,@Body() userpass:resetpassword) {
        return this.Userservice.resetpassword(req,userpass);
    }

    @UseGuards(RolesGuardadmin)
    @Patch('changerole/:id')
    @FormDataRequest()
    async changerole(@Param('id') id:string,@Body() role:updaterole) {
        return this.Userservice.updaterole(id,role);
    }

    
    @UseGuards(RolesGuarduser)
    @Patch('updateprofile')
    @UseInterceptors(FileInterceptor('file'))
    async changeuserprofile(@Request() req:RolesGuarduser,@UploadedFile() file: Express.Multer.File) {
        console.log(req);
        
        return this.Userservice.updateprofile(req);
    }
}


