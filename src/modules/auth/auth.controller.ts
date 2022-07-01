import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateOwnerDTO } from '../owner/dto/createOwner.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDTO } from '../user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('join/owner')
  createOwner(@Body() createOwnerDto: CreateOwnerDTO) {
    return this.authService.createOwner(createOwnerDto);
  }

  @Post('join/user')
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login/owner')
  async getProfile() {
    return 'ok';
  }

  @UseGuards(AuthGuard('local'))
  @Post('login/owner')
  async login(@Body() ownerData) {
    return ownerData.ownerId;
  }
}
