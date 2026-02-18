import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Bootstrap function - Application entry point
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * 1. Configure the NestJS application:
 *    - Enable CORS for frontend communication
 *    - Add global validation pipe
 *    - Set global prefix (e.g., /api)
 * 
 * 2. Environment configuration:
 *    - Use process.env.PORT for the port
 *    - Configure different settings for dev/prod
 * 
 * 3. Test the application:
 *    - Run: npm run start:dev
 *    - Visit: http://localhost:3001
 *    - Test endpoint: POST http://localhost:3001/auth/login
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000', // React default port
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Global API prefix
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📝 Login endpoint: http://localhost:${port}/api/auth/login`);
}

bootstrap();
