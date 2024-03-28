import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from 'src/auth/role/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [UserService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  controllers: [UserController]
})
export class UserModule {}
