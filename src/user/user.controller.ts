import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';
import { RolesGuard } from 'src/auth/role/role.guard';
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

	
	@Get('me')
	@UseGuards(RolesGuard)
	me(@Req() req:Request){
		console.log('controller',req.user)
		return req.user
	}
}
