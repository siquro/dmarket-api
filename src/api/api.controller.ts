import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiDTOMarketRequest } from './apiDTOMarketRequest';
import { ApiService } from './api.service';

@Controller('api')
//@UseGuards(AuthGuard)
//@UseGuards(SteamGuard)
export class ApiController {
  constructor(private apiService: ApiService) {}
  @Get('market')
  async getMarketList(@Body() request: ApiDTOMarketRequest) {
    console.log(request, typeof request);
    return this.apiService.getList(request);
  }
  @Get('test')
  test() {
    // dto
    return 'test';
  }
}
