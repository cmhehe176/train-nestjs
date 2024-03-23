import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}
	@Post()
	register(@Body() body : AuthDTO):Promise<User>{
		return this.authService.register(body)
	}
}


