import { IsNotEmpty } from 'class-validator';

export class userdto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    username: string;
  
  }