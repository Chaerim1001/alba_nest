import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from 'src/entities/experience.entity';
import { Jobpost } from 'src/entities/jobpost.entity';
import { Store } from 'src/entities/store.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ApplicationDocuments } from '../../entities/applicationdocuments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Store,
      Experience,
      Jobpost,
      ApplicationDocuments,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
