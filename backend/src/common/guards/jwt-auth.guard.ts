import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * JWT Auth Guard
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * This guard protects routes that require authentication.
 * 
 * 1. Implement the canActivate method to:
 *    - Extract JWT token from Authorization header
 *    - Verify the token is valid
 *    - Attach user data to the request object
 * 
 * 2. Use with @UseGuards decorator:
 *    @UseGuards(JwtAuthGuard)
 *    @Get('profile')
 *    getProfile(@Request() req) {
 *      return req.user;
 *    }
 * 
 * 3. Integration with Passport:
 *    - Extend AuthGuard('jwt') from @nestjs/passport
 *    - Configure JWT strategy
 * 
 * BONUS CHALLENGES:
 * - Add role-based authorization
 * - Implement token blacklisting
 * - Add refresh token validation
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // TODO: Students implement JWT validation
    // 1. Extract token from Authorization header
    // 2. Verify token using JWT library
    // 3. Attach user to request object
    // 4. Return true if valid, throw UnauthorizedException if not
    
    // Example:
    // const authHeader = request.headers.authorization;
    // if (!authHeader) {
    //   throw new UnauthorizedException('No token provided');
    // }
    // const token = authHeader.split(' ')[1];
    // try {
    //   const payload = this.jwtService.verify(token);
    //   request.user = payload;
    //   return true;
    // } catch (error) {
    //   throw new UnauthorizedException('Invalid token');
    // }
    
    throw new Error('JwtAuthGuard not implemented. Students should implement this.');
  }
}
