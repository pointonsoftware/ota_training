import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

/**
 * Login Controller - Vertical Slice
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * This controller is mostly complete, but students should:
 * 
 * 1. Understand the HTTP decorators:
 *    - @Controller - Defines the base route
 *    - @Post - Handles POST requests
 *    - @Body - Extracts request body
 *    - @HttpCode - Sets response status code
 * 
 * 2. Test the endpoint using:
 *    - Postman or Insomnia
 *    - curl command
 *    - Frontend application
 * 
 * 3. Add additional endpoints if needed:
 *    - Logout
 *    - Token refresh
 *    - Password reset
 * 
 * BONUS CHALLENGES:
 * - Add request logging
 * - Implement rate limiting
 * - Add API documentation using Swagger
 */
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /**
   * Login endpoint
   * POST /auth/login
   * 
   * @param loginDto - Contains email and password
   * @returns Access token and user information
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.loginService.login(loginDto);
  }

  /**
   * TODO: Students can add more endpoints here
   * Examples:
   * - POST /auth/logout
   * - POST /auth/refresh
   * - POST /auth/forgot-password
   */
}
