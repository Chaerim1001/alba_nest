import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import * as Bcrypt from 'bcrypt';
import { Store } from 'src/entities/store.entity';
import { Experience } from 'src/entities/experience.entity';
import { ApplyJobDTO } from './dto/applyJob.dto';
import { Jobpost } from 'src/entities/jobpost.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Experience)
    private expRepository: Repository<Experience>,

    @InjectRepository(Jobpost)
    private jobpostRepository: Repository<Jobpost>,
  ) {
    this.userRepository = userRepository;
    this.storeRepository = storeRepository;
    this.expRepository = expRepository;
    this.jobpostRepository = jobpostRepository;
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

  async applyJob(postId: number, applyJobDto: ApplyJobDTO) {
    try {
      const { userId, storeId } = applyJobDto;

      const user = await this.userRepository.findOne({ userId });
      const experience = await this.expRepository.findOne({ user });

      if (experience) {
        return '이미 신청한 공고입니다.';
      }

      const store = await this.storeRepository.findOne({ id: storeId });
      const jobpost = await this.jobpostRepository.findOne({ id: postId });

      if (store && user) {
        this.expRepository.save({
          result: 2,
          store,
          user,
          jobpost,
        });
      }
    } catch (err) {
      throw err;
    }
  }
}
