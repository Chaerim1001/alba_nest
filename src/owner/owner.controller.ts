import { Body, Controller, Get, Post } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDTO } from './dto/createOwner.dto';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDTO) {
    return this.ownerService.createOwner(createOwnerDto);
  }
}
