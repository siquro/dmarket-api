import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetUserDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
