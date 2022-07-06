import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApplyJobDTO } from './dto/applyJob.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('apply/:postId')
  applyJob(@Param('postId') postId: number, @Body() applyJobDto: ApplyJobDTO) {
    return this.userService.applyJob(postId, applyJobDto);
  }

  @Get('applyList/:userId')
  getApplyList(@Param('userId') userId: string) {
    return this.userService.getApplyList(userId);
  }
}
