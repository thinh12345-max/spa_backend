import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/auth/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import express from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: express.Response
  ) {
    const data = await this.authService.login(loginDto);

    res.cookie("spa_token", data.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 86400 * 1000,
    });

    return data;
  }

  // 🔥 API ME
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return this.authService.getMe(req.user.userId);
  }
}