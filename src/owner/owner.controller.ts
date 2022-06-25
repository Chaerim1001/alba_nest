import { Body, Controller, Get, Post } from '@nestjs/common';
import { Owner } from 'src/entities/owner.entity';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Get()
  findAll(): Promise<Owner[]> {
    return this.ownerService.findAll();
  }
}
