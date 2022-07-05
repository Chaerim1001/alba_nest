import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApplyJobDTO } from './dto/applyJob.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('apply/:postId')
  applyJob(@Param('postId') postId: number, @Body() applyJobDto: ApplyJobDTO) {
    return this.userService.applyJob(postId, applyJobDto);
  }
}
