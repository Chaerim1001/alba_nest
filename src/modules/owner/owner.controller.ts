import { Body, Controller, Post } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { RegisterStoreDTO } from './dto/registerStore.dto';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post('registerStore')
  registerStore(@Body() registerStoreDto: RegisterStoreDTO) {
    return this.ownerService.registerStore(registerStoreDto);
  }
}
