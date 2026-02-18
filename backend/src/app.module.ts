import { Module } from '@nestjs/common';
import { LoginModule } from './features/login/login.module';

/**
 * App Module - Root Module
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * 1. This is the root module of the application
 * 2. Import all feature modules here
 * 3. Configure global settings:
 *    - CORS for frontend communication
 *    - Global validation pipe
 *    - Global exception filters
 * 
 * Example global configuration in main.ts:
 * app.enableCors({
 *   origin: 'http://localhost:3000',
 *   credentials: true,
 * });
 * app.useGlobalPipes(new ValidationPipe());
 */
@Module({
  imports: [
    LoginModule,
    // TODO: Students can add more feature modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
