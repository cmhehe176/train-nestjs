import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}
	@Post()
	register(@Body() body : RegisterDTO):Promise<User>{
		return this.authService.register(body)
	}
}


