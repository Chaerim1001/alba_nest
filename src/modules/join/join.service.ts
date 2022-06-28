import { Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { CreateOwnerDTO } from '../owner/dto/createOwner.dto';

@Injectable()
export class JoinService {
  constructor(private ownerService: OwnerService) {}

  createOwner(createOwnerDto: CreateOwnerDTO) {
    this.ownerService.createOwner(createOwnerDto);
  }
}
