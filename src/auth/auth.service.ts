import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDTO } from './dto';
import { User } from '@prisma/client';
import { hash } from 'bcrypt'
@Injectable()
export class AuthService {
	//contructor : để thêm các service để xài
	constructor( private prisma: PrismaService){}
	register = async(Data : AuthDTO): Promise<User> =>{
		
		const user = await this.prisma.user.findUnique({
			where :{
				email: Data.email
			}
		})
		if(user){
			throw new HttpException({message:'da co email'},HttpStatus.BAD_REQUEST)
		}else{
			const hashpassword = await hash(Data.password,10)
			  var res = await this.prisma.user.create({
				data:{...Data,password:hashpassword}
			})
			return res
		}
		
	}
}
