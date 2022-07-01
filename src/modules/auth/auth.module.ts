import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OwnerModule } from '../owner/owner.module';
import { OwnerService } from '../owner/owner.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

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
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
})
export class AuthModule {}
