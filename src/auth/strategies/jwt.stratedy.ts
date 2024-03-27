import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";
import { AuthService } from "../auth.service";
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
	// validate : đứng giữa cái request và res, 
	
	async validate(payload: {
        id: number ,email:string
    } ){
        const user = await this.prisma.user.findUnique({
            where:{
                email : payload.email
            }
        })
		delete user.password
        return user
    }


	// validate(payload : any){
	// 	return payload
	// }
	
}
//có thể sử dụng config.service để mà lấy data ở env , nhưng mà với mô hình bé thì không cần 
// dùng config thì sẽ bảo mật hơn 