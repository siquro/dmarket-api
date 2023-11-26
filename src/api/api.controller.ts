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

@Controller('api')
@UseGuards(AuthGuard)
export class ApiController {
  @Get('test')
  test() {
    // dto
    return 'test';
  }
}
