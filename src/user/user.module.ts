import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from 'src/auth/role/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    UserService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
    PrismaService

],
  controllers: [UserController]
})
export class UserModule {}
