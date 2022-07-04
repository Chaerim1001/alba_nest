import { Injectable } from '@nestjs/common';
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

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Jobpost)
    private postRepository: Repository<Jobpost>,
  ) {
    this.ownerRepository = ownerRepository;
    this.storeRepository = storeRepository;
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

  async createPost(storeId: number, createPostDto: CreatePostDTO) {
    try {
      const store = await this.storeRepository.findOne({ id: storeId });
      if (store !== null) {
        this.postRepository.save({
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
      const post = await this.postRepository.findOne({ id: postId });
      if (post !== null) {
        return post;
      }
    } catch (err) {
      throw err;
    }
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDTO) {
    try {
      const post = await this.postRepository.findOne({ id: postId });
      if (post !== null) {
        this.postRepository.update(post, {
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
      const post = await this.postRepository.findOne({ id: postId });
      if (post !== null) {
        this.postRepository.delete(post);
      }
    } catch (err) {
      throw err;
    }
  }
}
