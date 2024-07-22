import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/userRegister.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //?-------------user-------
  @Post('/user/register')
  user_register(@Body() userDate: userRegisterDto) {
    return this.authService.userRegister(userDate);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/user/login')
  userLogin(@Req() req: Request) {
    return this.authService.userLogin(req.user);
  }

  //?------------------------
}
