import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';
@Controller('user')
export class UserController {
	@UseGuards(AuthGuard('jwt'))
	@Roles(Role.Student)
	@Get('me')
	me(@Req() req:Request){
		console.log(req.user)
		return req.user
	}
}
