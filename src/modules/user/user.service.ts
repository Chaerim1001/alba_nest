import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import * as Bcrypt from 'bcrypt';
import { Store } from 'src/entities/store.entity';
import { Experience } from 'src/entities/experience.entity';
import { ApplyJobDTO } from './dto/applyJob.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Experience)
    private expRepository: Repository<Experience>,
  ) {
    this.userRepository = userRepository;
    this.storeRepository = storeRepository;
    this.expRepository = expRepository;
  }

  async getByUserId(userId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ userId });
      if (user) {
        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  async createUser(createUserDto: CreateUserDTO): Promise<void> {
    try {
      const { userId, pwd, email, phoneNumber, name, birth } = createUserDto;
      const hashPwd: string = await Bcrypt.hash(pwd, 12);

      await this.userRepository.save({
        userId,
        pwd: hashPwd,
        email,
        phoneNumber,
        name,
        birth,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async applyJob(applyJobDto: ApplyJobDTO) {
    try {
      const { userId, storeId } = applyJobDto;

      const store = await this.storeRepository.findOne({ id: storeId });
      const user = await this.userRepository.findOne({ userId });

      if (store !== null && user !== null) {
        this.expRepository.save({
          result: 2,
          store,
          user,
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
