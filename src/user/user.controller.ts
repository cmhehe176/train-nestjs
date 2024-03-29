import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { Student } from 'src/auth/role/role.student.guard';
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
	@UseGuards(Student)
	@Get('me')
	me(@Req() req:Request){
		console.log('controller',req.user)
		return req.user
	}
}

