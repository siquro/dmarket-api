import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterUserDTO } from '../users/user.register.dto';
import { LoginUserDTO } from '../users/user.login.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() request: LoginUserDTO) {
    return this.authService.signIn(request.email, request.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() request: RegisterUserDTO) {
    return this.authService.register(request);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify/:token')
  verify(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
