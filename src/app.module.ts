import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { Student } from './auth/role/role.student.guard';
import { PrismaService } from './prisma.service';

@Module({
	imports:[ AuthModule, UserModule],
	providers:[
	  PrismaService
	],

})

//provider: import chủ yếu service
export class AppModule {}

