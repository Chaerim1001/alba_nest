import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OwnerModule } from '../owner/owner.module';
import { OwnerService } from '../owner/owner.service';
import { PassportModule } from '@nestjs/passport';
import { LocalOwnerStrategy } from './localOwner.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { LocalUserStrategy } from './localUser.strategy';

@Module({
  imports: [
    OwnerModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'jwt secret key',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [
    OwnerService,
    AuthService,
    LocalOwnerStrategy,
    JwtStrategy,
    UserService,
    LocalUserStrategy,
  ],
})
export class AuthModule {}
