import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/entities/owner.entity';
import { Repository } from 'typeorm';
import { CreateOwnerDTO } from './dto/createOwner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {
    this.ownerRepository = ownerRepository;
  }

  async createOwner(createOwnerDto: CreateOwnerDTO): Promise<void> {
    try {
      await this.ownerRepository.save(createOwnerDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async addStore(createOwnerDto: CreateOwnerDTO): Promise<void> {
    try {
      await this.ownerRepository.save(createOwnerDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
