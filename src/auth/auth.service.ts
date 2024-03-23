import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDTO, LoginDTO } from './dto';
import { User } from '@prisma/client';
import { hash,compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
	//contructor : để thêm các service để xài
	constructor( 
		private prisma: PrismaService,
		private jwt:JwtService
		){}
		register = async(Data :RegisterDTO): Promise<User> =>{

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
	// login = async(Data: LoginDTO): Promise<any> =>{
	// 		//1 check user in db 
	// 		const user = await this.prisma.user.findUnique({
	// 			where:{
	// 				email: Data.email
	// 			}
	// 		})
	// 		if( !user){
	// 			throw new HttpException({message: 'tai khoan ko ton tai'},HttpStatus.UNAUTHORIZED)
	// 		}
	// 		//2 check pass
	// 		const verify = await compare(Data.password,user.password)
	// 		if(!verify){
	// 			throw new HttpException({message: 'mat khau sai '},HttpStatus.UNAUTHORIZED)
	// 		}
	// 		//3tao access token vaf refresh token 
	// 		const payload = { 
	// 			id:user.id,
	// 			name:user.name,
	// 			email: user.email
	// 		}
	// 		const accesstoken = await this.jwt.signAsync(payload,{
	// 			secret: process.env.ACCESS_TOKEN_KEY,
	// 			expiresIn:'2h'
	// 		})
	// 		const refreshtoken = await this.jwt.signAsync(payload,{
	// 			secret: process.env.REFRESH_TOKEN_KEY,
	// 			expiresIn:'2d'
	// 		})
	// 		return {
	// 			accesstoken,
	// 			refreshtoken
	// 		}	
	// }
	
}
