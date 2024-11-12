import { IsEmail, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}
