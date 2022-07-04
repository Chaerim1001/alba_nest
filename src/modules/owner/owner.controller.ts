import { Body, Controller, Param, Post } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { RegisterStoreDTO } from './dto/registerStore.dto';
import { CreatePostDTO } from './dto/createPost.dto';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post('registerStore')
  registerStore(@Body() registerStoreDto: RegisterStoreDTO) {
    return this.ownerService.registerStore(registerStoreDto);
  }

  @Post('post/create/:storeId')
  createPost(
    @Param('storeId') storeId: number,
    @Body() createPostDto: CreatePostDTO,
  ) {
    return this.ownerService.createPost(storeId, createPostDto);
  }
}
