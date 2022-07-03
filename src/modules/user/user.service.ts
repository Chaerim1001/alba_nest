import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
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
}
