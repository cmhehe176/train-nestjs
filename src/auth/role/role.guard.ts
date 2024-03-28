import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // nếu không dùng decorator @Role => tất cả mọi người đểu có thể truy cập 
    // thế mới return true ok 
    if (!requiredRoles) {
      return true;
    }
    //user ở đây là sẽ lấy từ request của người dùng 
    // ??? nhưng mà người dùng thì có gửi role cùng với request đâu nhỉ ??
    // ??? nếu thế thì ai có thể hack bằng cách đổi role  từ user thành role admin rồi gửi request xuống là oke 
    // => không ổn , phải dùng strategy để check user là ai đã , rồi lấy user đấy rồi dùng user.role để lấy role rồi mới so sánh chứ không lấy user.role từ request được 
    // oke triển 
//!!!
    // khi đã đi qua guard thì nó đã check được là ai , có role gì rồi , và nó  trả về 1 request của người dùng 
    // với mô hình như vậy thì cứ tiếp tục lấy request của người dùng so sánh là được 
    // nó sẽ kiểu 
        //@UseGuards(AuthGuard('jwt'))
        //@Role(admin)

    //so sánh với role trong file role.enum 
    const { user } = context.switchToHttp().getRequest();
    console.log(user)
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
