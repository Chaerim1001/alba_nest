import { Controller, Post, Body } from '@nestjs/common';
import { JoinService } from './join.service';
import { CreateOwnerDTO } from '../owner/dto/createOwner.dto';

@Controller('join')
export class JoinController {
  constructor(private joinService: JoinService) {}

  @Post('owner')
  create(@Body() createOwnerDto: CreateOwnerDTO) {
    return this.joinService.createOwner(createOwnerDto);
  }
}
