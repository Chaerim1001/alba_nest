import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(
  Strategy,
  'local-user',
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userId',
      passwordField: 'pwd',
    });
  }

  async validate(userId: string, pwd: string): Promise<any> {
    const user = await this.authService.validateUser(userId, pwd);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
