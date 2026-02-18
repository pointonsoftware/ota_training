import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

/**
 * Login Service - Vertical Slice
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * 1. Implement the login method to:
 *    - Validate user credentials against a mock or real database
 *    - Use bcrypt to compare hashed passwords
 *    - Generate a JWT token upon successful authentication
 *    - Return user information and token
 * 
 * 2. Mock user data for testing:
 *    - Create a mock user array or use a database
 *    - Hash passwords using bcrypt
 * 
 * 3. Handle errors appropriately:
 *    - Throw UnauthorizedException for invalid credentials
 *    - Return proper error messages
 * 
 * BONUS CHALLENGES:
 * - Add password hashing service
 * - Implement token refresh mechanism
 * - Add rate limiting to prevent brute force attacks
 */
@Injectable()
export class LoginService {
  /**
   * TODO: Students implement this method
   * 
   * @param loginDto - Contains email and password
   * @returns LoginResponseDto with access token and user info
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // TODO: Implement login logic
    // 1. Find user by email
    // 2. Compare password with hashed password
    // 3. Generate JWT token
    // 4. Return user data and token
    
    throw new Error('Login method not implemented. Students should implement this.');
  }

  /**
   * TODO: Students can implement this helper method
   * 
   * @param email - User email
   * @returns User object or null
   */
  private async findUserByEmail(email: string): Promise<any> {
    // TODO: Implement user lookup
    // Mock data example:
    // const mockUsers = [
    //   {
    //     id: '1',
    //     email: 'student@example.com',
    //     password: '$2b$10$...',  // hashed 'password123'
    //     name: 'Test Student'
    //   }
    // ];
    return null;
  }

  /**
   * TODO: Students can implement this helper method
   * 
   * @param plainPassword - Password from user input
   * @param hashedPassword - Hashed password from database
   * @returns boolean indicating if passwords match
   */
  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // TODO: Use bcrypt to compare passwords
    // Example: return await bcrypt.compare(plainPassword, hashedPassword);
    return false;
  }

  /**
   * TODO: Students can implement this helper method
   * 
   * @param userId - User ID
   * @param email - User email
   * @returns JWT token string
   */
  private async generateToken(userId: string, email: string): Promise<string> {
    // TODO: Use @nestjs/jwt to generate token
    // Example: return this.jwtService.sign({ sub: userId, email });
    return '';
  }
}
