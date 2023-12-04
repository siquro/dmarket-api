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
import { ResetUserDTO } from '../users/user.reset.dto';
import { UpdateUserPasswordDTO } from '../users/user.update.password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) @Post('login') signIn(
    @Body() request: LoginUserDTO,
  ) {
    return this.authService.signIn(request.email, request.password);
  }

  @Post('register') register(@Body() request: RegisterUserDTO) {
    return this.authService.register(request);
  }

  @Post('reset')
  async reset(@Body() request: ResetUserDTO) {
    return await this.authService.resetProfile(request.email);
  }

  @Post('reset/password')
  async updatePassword(@Body() request: UpdateUserPasswordDTO) {
    return await this.authService.updatePassword(
      request.token,
      request.password,
    );
  }

  /*
   * TODO:: add DTO
   *
   * */
  @HttpCode(HttpStatus.OK) @Get('verify/:token') verify(
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(token);
  }

  @UseGuards(AuthGuard) @Get('profile') getProfile(@Request() req) {
    return req.user;
  }
}
