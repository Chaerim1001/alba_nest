import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalOwnerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'ownerId',
      passwordField: 'pwd',
    });
  }

  async validate(ownerId: string, password: string): Promise<any> {
    const owner = await this.authService.validateOwner(ownerId, password);
    if (!owner) {
      throw new UnauthorizedException();
    }
    return owner;
  }
}
