import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Mock authentication logic
    if (username === 'admin' && password === 'password123') {
      return {
        accessToken: 'mock-token-xyz',
      };
    }

    // If credentials are wrong
    throw new UnauthorizedException('Invalid username or password');
  }

}