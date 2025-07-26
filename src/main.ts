import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Your Angular frontend
    credentials: true, // if using cookies
  });

  await app.listen(3000);
}
bootstrap();
