import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userRegisterDto } from './dto/userRegister.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Public } from 'src/public-route/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //?-------------user-------
  @Public()
  @Post('/user/register')
  user_register(@Body() userDate: userRegisterDto) {
    return this.authService.userRegister(userDate);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('/user/login')
  userLogin(@Req() req: Request) {
    return this.authService.userLogin(req.user);
  }

  //?------------------------
}
