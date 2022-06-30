import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OwnerModule } from '../owner/owner.module';
import { OwnerService } from '../owner/owner.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [OwnerModule, PassportModule],
  controllers: [AuthController],
  providers: [OwnerService, AuthService, LocalStrategy],
})
export class AuthModule {}
