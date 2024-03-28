import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";
import { Injectable } from "@nestjs/common";
//strategy
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy,'jwt') {
	constructor(
		private prisma : PrismaService,
		){
		super({
			// token sẽ luôn thêm vào mọi request (exept login/register)
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.ACCESS_TOKEN_KEY
		})
	}

	// validate : đứng giữa cái request và res

	validate = async(payload: {
        id: number ,email:string
    } ) :Promise<any>=>{
        const user = await this.prisma.user.findUnique({
            where:{
                email : payload.email
            }
        })
		delete user.password
        return user
    }
	//code toàn bug khó chịu vcl 

	// validate(payload : any){
	// 	return payload
	// }
	
}
//có thể sử dụng config.service để mà lấy data ở env , nhưng mà với mô hình bé thì không cần 
// dùng config thì sẽ bảo mật hơn 