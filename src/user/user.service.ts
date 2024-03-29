import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { userInfo } from 'os';
import { Guard } from 'src/auth/dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor( private prisma : PrismaService){}
    getUserbyEmail = async (Data: Guard):Promise<User>=>{
        const user = await this.prisma.user.findUnique({
            where:{
                email: Data.email
            }
        })
        if(!user){
            throw new HttpException({message:'Tài khoản không tồn tại '},HttpStatus.BAD_REQUEST)
        }
        return user
    }
}
