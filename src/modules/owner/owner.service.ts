import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/entities/owner.entity';
import { Repository } from 'typeorm';
import { CreateOwnerDTO } from './dto/createOwner.dto';
import { RegisterStoreDTO } from './dto/registerStore.dto';
import { Store } from 'src/entities/store.entity';
import * as Bcrypt from 'bcrypt';
import { CreatePostDTO } from './dto/createPost.dto';
import { Jobpost } from 'src/entities/jobpost.entity';
import { UpdatePostDTO } from './dto/updatePost.dto';
import { Experience } from 'src/entities/experience.entity';
import { User } from 'src/entities/user.entity';
import { ApplicationDocuments } from '../../entities/applicationdocuments.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Jobpost)
    private jobpostRepository: Repository<Jobpost>,

    @InjectRepository(Experience)
    private expRepository: Repository<Experience>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ApplicationDocuments)
    private applicationDocumentsRepository: Repository<ApplicationDocuments>,
  ) {
    this.ownerRepository = ownerRepository;
    this.storeRepository = storeRepository;
    this.jobpostRepository = jobpostRepository;
    this.userRepository = userRepository;
    this.expRepository = expRepository;
    this.applicationDocumentsRepository = applicationDocumentsRepository;
  }

  async createOwner(createOwnerDto: CreateOwnerDTO): Promise<void> {
    try {
      const { ownerId, pwd, email, phoneNumber, name } = createOwnerDto;
      const hashPwd: string = await Bcrypt.hash(pwd, 12);

      await this.ownerRepository.save({
        ownerId,
        pwd: hashPwd,
        email,
        phoneNumber,
        name,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getByOwnerId(ownerId: string): Promise<Owner> {
    try {
      const owner = await this.ownerRepository.findOne({ ownerId });
      if (owner) {
        return owner;
      }
    } catch (err) {
      throw err;
    }
  }

  async registerStore(registerStoreDto: RegisterStoreDTO) {
    try {
      const { storeName, storeNumber, startDate, ownerId } = registerStoreDto;

      const owner = await this.ownerRepository.findOne({ id: ownerId });

      if (owner.store !== null) {
        throw new NotAcceptableException('already register store');
      } else {
        const newStore = await this.storeRepository.save({
          storeName,
          storeNumber,
          startDate,
        });
        owner.store = newStore;
        this.ownerRepository.save(owner);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createPost(storeId: number, createPostDto: CreatePostDTO) {
    try {
      const store = await this.storeRepository.findOne({ id: storeId });
      if (store !== null) {
        this.jobpostRepository.save({
          store,
          ...createPostDto,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async getOnePost(postId: number) {
    try {
      const post = await this.jobpostRepository.findOne({ id: postId });
      if (post !== null) {
        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  async getPostList(storeId: any) {
    try {
      const posts = await this.jobpostRepository.find({ store: storeId });
      if (posts !== null) {
        return posts;
      }
    } catch (err) {
      throw err;
    }
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDTO) {
    try {
      const post = await this.jobpostRepository.findOne({ id: postId });
      if (post !== null) {
        this.jobpostRepository.update(post, {
          updatedAt: new Date(),
          ...updatePostDto,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async deletePost(postId: number) {
    try {
      const post = await this.jobpostRepository.findOne({ id: postId });
      if (post !== null) {
        this.jobpostRepository.delete(post);
      }
    } catch (err) {
      throw err;
    }
  }

  async getApplicantList(postId: number) {
    try {
      const jobpost = await this.jobpostRepository.findOne({ id: postId });
      const experience = await this.expRepository.find({ jobpost });
      return experience;
    } catch (err) {
      throw err;
    }
  }

  async checkApplicant(postId: number, userId: string, check: number) {
    try {
      const jobpost = await this.jobpostRepository.findOne({ id: postId });
      const user = await this.userRepository.findOne({ userId });
      const application = await this.expRepository.findOne({ jobpost, user });
      this.expRepository.update(application, { result: check });
    } catch (err) {
      throw err;
    }
  }
  async getApplicationDocuments(postId, userId) {
    try {
      const jobpost = await this.jobpostRepository.findOne({ id: postId });
      const user = await this.userRepository.findOne({ userId });
      const experience = await this.expRepository.findOne({ jobpost, user });
      if (experience) {
        const doc = await this.applicationDocumentsRepository.findOne({
          user,
        });
        return doc;
      }
    } catch (err) {
      throw err;
    }
  }
}
