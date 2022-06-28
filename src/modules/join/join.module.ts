import { Module } from '@nestjs/common';
import { JoinController } from './join.controller';
import { JoinService } from './join.service';
import { OwnerModule } from '../owner/owner.module';
import { OwnerService } from '../owner/owner.service';

@Module({
  imports: [OwnerModule],
  controllers: [JoinController],
  providers: [OwnerService, JoinService],
})
export class JoinModule {}
