import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { LoginDTO, RegisterDTO } from './dto';
// import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}
	@Post('register')
	register(@Body() body : RegisterDTO):Promise<any>{
=======
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { User } from '@prisma/client';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService){}
	 @Post('register')
	register(@Body() body : RegisterDTO):Promise<User>{
>>>>>>> authorization
		return this.authService.register(body)
	}
	//@UseGuards(AuthenGuard)
	@Post('login')
	login(@Body() body: LoginDTO):Promise<any>{
		return this.authService.login(body)
	}
}



