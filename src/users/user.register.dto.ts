import { IsEmail, IsNotEmpty } from 'class-validator';
import { isUnique } from '../util/validators';
export class RegisterUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @isUnique({ tableName: 'users', column: 'email' })
  email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
}
