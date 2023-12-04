import { IsEmail, IsNotEmpty } from 'class-validator';
import { isUnique } from '../util/validators/unique';
export class RegisterUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @isUnique({ tableName: 'user', column: 'email' })
  email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
}
