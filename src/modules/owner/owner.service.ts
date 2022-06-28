import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/entities/owner.entity';
import { Repository } from 'typeorm';
import { CreateOwnerDTO } from './dto/createOwner.dto';
import { RegisterStoreDTO } from './dto/registerStore.dto';
import { Store } from 'src/entities/store.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {
    this.ownerRepository = ownerRepository;
    this.storeRepository = storeRepository;
  }

  async createOwner(createOwnerDto: CreateOwnerDTO): Promise<void> {
    try {
      await this.ownerRepository.save(createOwnerDto);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async registerStore(registerStoreDto: RegisterStoreDTO) {
    try {
      const { storeName, storeNumber, startDate, ownerId } = registerStoreDto;
      const newStore = await this.storeRepository.save({
        storeName,
        storeNumber,
        startDate,
      });

      try {
        const owner = await this.ownerRepository.findOne(ownerId);

        owner.store = newStore;
        this.ownerRepository.save(owner);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
