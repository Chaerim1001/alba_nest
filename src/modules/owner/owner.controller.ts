import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { RegisterStoreDTO } from './dto/registerStore.dto';
import { CreatePostDTO } from './dto/createPost.dto';
import { UpdatePostDTO } from './dto/updatePost.dto';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post('registerStore')
  registerStore(@Body() registerStoreDto: RegisterStoreDTO) {
    return this.ownerService.registerStore(registerStoreDto);
  }

  @Get('post/:postId')
  getOnePost(@Param('postId') postId: number) {
    return this.ownerService.getOnePost(postId);
  }

  @Get('postList/:storeId')
  getPostList(@Param('storeId') storeId: any) {
    return this.ownerService.getPostList(storeId);
  }

  @Post('post/create/:storeId')
  createPost(
    @Param('storeId') storeId: number,
    @Body() createPostDto: CreatePostDTO,
  ) {
    return this.ownerService.createPost(storeId, createPostDto);
  }

  @Patch('post/update/:postId')
  updatePost(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDTO,
  ) {
    return this.ownerService.updatePost(postId, updatePostDto);
  }

  @Delete('post/delete/:postId')
  deletePost(@Param('postId') postId: number) {
    return this.ownerService.deletePost(postId);
  }

  @Get('post/applicantList/:postId')
  getApplicantList(@Param('postId') postId: number) {
    return this.ownerService.getApplicantList(postId);
  }
}
