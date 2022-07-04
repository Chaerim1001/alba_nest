import { CreatePostDTO } from './createPost.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
