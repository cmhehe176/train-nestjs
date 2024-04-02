import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './module/user/user.module';
import { PrismaService } from './prisma.service';
import { SubjectModule } from './module/subject/subject.module';
import { ClassService } from './module/class/class.service';
import { ClassModule } from './module/class/class.module';

@Module({
	imports:[ 
		AuthModule, 
		UserModule, 
		SubjectModule, ClassModule
	],
	providers:[
	  PrismaService,
	  ClassService
	],

})

//provider: import chủ yếu service
export class AppModule {}

