import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieParser = require('cookie-parser'); // 🔥 đổi sang require

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  app.use(cookieParser()); // ✅ sẽ chạy OK

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
app.enableCors({
    origin: 'http://localhost:5137', // frontend
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();