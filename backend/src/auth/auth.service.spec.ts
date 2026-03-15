import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an accessToken for valid credentials', () => {
    const result = service.login({
      username: 'admin',
      password: 'password123', // valid (>=6 characters)
    });

     
    expect(result).toEqual({
      accessToken: 'mock-token-xyz',
    });
  });
  

  it('should throw UnauthorizedException for invalid credentials', () => {
    expect(() =>
      service.login({
        username: 'wrong',
        password: 'wrongpass', // valid length but wrong credentials
      }),
    ).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException for password shorter than 6 characters', () => {
    expect(() =>
      service.login({
        username: 'admin',
        password: '123', // too short
      }),
    ).toThrow(UnauthorizedException);
  });

        username: 'admin'
  it('should throw UnauthorizedException for empty password', () => {
    expect(() =>
      service.login({
        username: 'admin',
        password: '', // empty string
      }),
    ).toThrow(UnauthorizedException);
  });
});