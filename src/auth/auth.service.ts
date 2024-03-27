import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO, RegisterDTO} from './dto/auth.dto';
import { hash ,compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {

	//contructor : để thêm các service để xài
	constructor( 
		private prisma: PrismaService,
		private jwt:JwtService
		){}
		// ở đây promise có nhiệm vụ giúp đảm bảo rằng register sẽ không trả về kết quả 
		// cho đến khi tất cả các tác vụ bất đồng bộ được hoàn tất 
		// và sau đó sẽ trả về kết quả là user trong Promise<user> 
		// đây là kiểu khai báo ở trong nestjs thôi , làm quen dần thôi 

		register = async(Data: RegisterDTO): Promise<User> =>{
			const user = await this.prisma.user.findUnique({
				where : {
					email: Data.email 
				}
			})
			if(user){
				throw new HttpException({message:'Email đã tồn tại'},HttpStatus.BAD_REQUEST)
			}
			const hashpassword = await hash(Data.password,10)
			const res = await this.prisma.user.create({
			  data:{...Data,password:hashpassword}
		  })
		  	return res
		}

			//dùng throw thì nếu đúng thì sẽ out đoạn mã đang chạy 
			//ví dụ ở đây là dùng throw thì sẽ cancel tất cả đoạn mã ở sau if(){ throw }
			//=> Email đã tồn tại 
			//=> công dụng trong th này là để truyền lỗi ra bên ngoài 
		login = async(Data: LoginDTO): Promise<any> =>{
			//1.check user in db nếu đã tồn tại => error
			const user = await this.prisma.user.findUnique({
				where:{
					email: Data.email
				}
			})
			if(!user){
				throw new HttpException({message: 'Tài khoản không tồn tại'},HttpStatus.UNAUTHORIZED)
			}
			//2. check pass
			const verify = await compare(Data.password,user.password)
			if(!verify){
				throw new HttpException({message: 'Sai mật khẩu '},HttpStatus.UNAUTHORIZED)
			}
			//3.tao accesstoken và refreshtoken sau đó return về client để store
			const payload = { 
				id:user.id,
				name:user.name,
				email: user.email
			}
			const accesstoken = await this.jwt.signAsync(payload,{
				secret: process.env.ACCESS_TOKEN_KEY,
				expiresIn:process.env.ACCESS_TOKEN_KEY_EXPRIRE
			})
			const refreshtoken = await this.jwt.signAsync(payload,{
				secret: process.env.REFRESH_TOKEN_KEY,
				expiresIn:process.env.REFRESH_TOKEN_KEY_EXPRIRE
			})
			return {
				accesstoken,
				refreshtoken
			}	
	}
}
