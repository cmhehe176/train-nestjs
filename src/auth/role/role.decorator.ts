import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
//Setmetadata: không cần import hay gì cả , chỉ cần khai báo như này => cứ @Roles mà dùng thôi xx
//==> uy tín
//=> hàm này để như decorator

//==> ROLES_KEY = ['student','teacher']
//=> thay đổi ở trong role.enum