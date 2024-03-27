import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port,()=>{
    console.log('127.0.0.1:'+port)
  });
}
bootstrap();
//tạo 1 lớp role.guard để so sánh các role được gán cho người dùng hiện tại với các role
//được gán cho người dùng thực tế được require bởi các route 
//để truy cập các role của các route được khai báo , sủ dụng các package trong @nestjs/core
