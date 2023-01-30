import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RolesGuardadmin implements CanActivate {
  constructor(private readonly jwtService:JwtService) {}

  canActivate(context: ExecutionContext):boolean{
    
    try {
      const request = context.switchToHttp().getRequest();
        const token = request.headers.token;
        if(!token)
        {
            throw new UnauthorizedException('token is not provided');
        } 
        const user = this.jwtService.verify(token)
        request.user=user

        if(user.isAdmin)
        {
            return true;
        }else{
          throw new UnauthorizedException('user can not perform this action');
        }
    } catch (error) {
        throw new UnauthorizedException('invalid or expire token');  
    }
  }
}

@Injectable()
export class RolesGuarduser implements CanActivate {
  constructor(private readonly jwtService:JwtService) {}

  canActivate(context: ExecutionContext):boolean{ 
    try {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.token;
        
        if(!token)
        {
            throw new UnauthorizedException('token is not provided');
        }
        const user = this.jwtService.verify(token)        
        if(!user.isAdmin)
        {
          request.user=user
            return true;
        }
    } catch (error) {
        throw new UnauthorizedException('invalid or expire token');  
    }
  }
}