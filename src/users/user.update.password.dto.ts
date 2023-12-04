import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserPasswordDTO {
  @IsNotEmpty() readonly token: string;

  @IsNotEmpty() readonly password: string;
}
