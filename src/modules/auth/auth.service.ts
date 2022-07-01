import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { CreateOwnerDTO } from '../owner/dto/createOwner.dto';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private jwtService: JwtService,
  ) {}

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
    const accessToken = await this.jwtService.sign(result);
    result['token'] = accessToken;
    return result;
  }
}
