import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}
	@Post('register')
	register(@Body() body : RegisterDTO):Promise<User>{
		return this.authService.register(body)
	}
	@Post('login')
	login(@Body() body: LoginDTO):Promise<any>{
		return this.authService.login(body)
	}
}



