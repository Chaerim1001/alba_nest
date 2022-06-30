import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { CreateOwnerDTO } from '../owner/dto/createOwner.dto';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private ownerService: OwnerService) {}

  createOwner(createOwnerDto: CreateOwnerDTO) {
    this.ownerService.createOwner(createOwnerDto);
  }

  async validateOwner(ownerId: string, password: string) {
    const owner = await this.ownerService.getByOwnerId(ownerId);
    const isPasswordMatching = await Bcrypt.compare(password, owner.pwd);
    if (!isPasswordMatching) {
      throw new HttpException(
        '잘못된 인증 정보입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { pwd, ...result } = owner;
    return result;
  }
}
