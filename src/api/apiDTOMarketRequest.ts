import { IsNotEmpty, Max, Min } from 'class-validator';
import { GAMES } from './api.enum.game';
import { CURRENCY } from './api.enum.currency';

export class ApiDTOMarketRequest {
  currency: CURRENCY = CURRENCY.USD;
  @Min(1)
  @Max(100)
  limit: number = 10;
  gameId: GAMES = GAMES.CSGO;
}
/* @IsNotEmpty()
  @IsEmail()
  @isUnique({ tableName: 'user', column: 'email' })
  email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;*/
