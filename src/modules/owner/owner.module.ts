import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/entities/owner.entity';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { Store } from 'src/entities/store.entity';
import { Jobpost } from 'src/entities/jobpost.entity';
import { Experience } from '../../entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Store, Jobpost, Experience])],
  exports: [TypeOrmModule],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
