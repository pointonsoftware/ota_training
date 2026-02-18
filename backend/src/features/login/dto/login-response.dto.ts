/**
 * Data Transfer Object for login response
 * Students should implement the logic to generate and return this token
 */
export class LoginResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
