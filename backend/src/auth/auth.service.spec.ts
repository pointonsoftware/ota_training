import { Test, TestingModule } from "@nestjs/testing";
import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an accessToken for valid credentials", () => {
    const result = service.login({
      username: "admin",
      password: "password123",
    });
    expect(result).toEqual({ accessToken: "mock-token-xyz" });
  });

  it("should throw UnauthorizedException for invalid credentials", () => {
    expect(() =>
      service.login({ username: "wrong", password: "wrong" }),
    ).toThrow(UnauthorizedException);
  });
});
