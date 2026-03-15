import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  /**
   * TODO: Implement the login method.
   *
   * Requirements:
   * - Accept a `LoginDto` as the parameter.
   * - If `username === 'admin'` AND `password === 'password123'`,
   *   return `{ accessToken: 'mock-token-xyz' }`.
   * - For any other combination, throw an `UnauthorizedException`.
   */
  login(loginDto: LoginDto): { accessToken: string } {
    throw new UnauthorizedException("Not implemented yet");
  }
}
