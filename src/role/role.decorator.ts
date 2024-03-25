import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
//Setmetadata: không cần import hay gì cả , chỉ cần khai báo như này => cứ @Roles mà dùng thôi 
//uy tín
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);