import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginResponseDTO {
  @IsEmail({}, { message: 'Email is not valid!' })
  email: string;

  @MinLength(8, { message: 'Password is not valid!' })
  @IsString()
  password: string;
}
