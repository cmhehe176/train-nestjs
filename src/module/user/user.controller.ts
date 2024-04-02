import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { Student } from 'src/auth/role/role.student.guard';
//
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
	@UseGuards(Student)
	@Get('me')
	me(@Req() req:Request){
		 console.log(JSON.stringify(Object.keys(req)))
		 console.log('controller',req.login)
		return req.user 
	}
	//@Post()
	









}

