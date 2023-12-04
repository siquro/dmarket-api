import {  IsNotEmpty } from "class-validator";

export class UpdateUserPasswordDTO {
  @IsNotEmpty() readonly password: string;
}
