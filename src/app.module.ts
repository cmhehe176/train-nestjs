import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user/user.module';
import { PrismaService } from './prisma.service';

@Module({
	imports:[ AuthModule, UserModule],
	providers:[
	  PrismaService
	],

})

//provider: import chủ yếu service
export class AppModule {}

