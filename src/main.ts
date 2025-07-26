import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: true, // Allow all origins for now, you can restrict this later
    credentials: true, // if using cookies
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
