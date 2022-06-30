import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOwnerDTO } from '../owner/dto/createOwner.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('join/owner')
  createOwner(@Body() createOwnerDto: CreateOwnerDTO) {
    return this.authService.createOwner(createOwnerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login/owner')
  async login(@Body() req) {
    console.log('login');
    return req;
  }
}
