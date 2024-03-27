import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
	imports:[ AuthModule, UserModule]
})

//provider: import chủ yếu service
export class AppModule {}
