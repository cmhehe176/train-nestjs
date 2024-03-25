import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { User } from '@prisma/client';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}
	@Post('register')
	@Roles(Role.Admin)
	register(@Body() body : RegisterDTO):Promise<User>{
		return this.authService.register(body)
	}
	@Post('login')
	login(@Body() body: LoginDTO):Promise<any>{
		return this.authService.login(body)
	}
}



