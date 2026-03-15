import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  // TODO: Add the `username` field with proper validation decorators.
  @IsString()
  @IsNotEmpty()
  username: string;

  // TODO: Add the `password` field with proper validation decorators.
  @IsString()
  @IsNotEmpty()
  password: string;
}
