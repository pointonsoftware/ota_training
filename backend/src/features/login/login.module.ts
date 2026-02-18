import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

/**
 * Login Module - Vertical Slice
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * This module encapsulates the entire login feature (vertical slice).
 * 
 * 1. Import required dependencies:
 *    - JwtModule for token generation
 *    - PassportModule for authentication strategies
 *    - Any database modules
 * 
 * 2. Configure JWT:
 *    - Set secret key (use environment variables)
 *    - Set expiration time
 * 
 * Example:
 * imports: [
 *   JwtModule.register({
 *     secret: process.env.JWT_SECRET || 'your-secret-key',
 *     signOptions: { expiresIn: '1h' },
 *   }),
 * ]
 */
@Module({
  imports: [
    // TODO: Students add required imports here
    // Example: JwtModule, PassportModule, DatabaseModule
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
