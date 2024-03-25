import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let port = process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port,()=>{
    console.log('localhost:'+port)
  });
}
bootstrap();
//authen