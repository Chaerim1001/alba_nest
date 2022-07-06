import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ApplyJobDTO } from './dto/applyJob.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('apply/:postId')
  applyJob(@Param('postId') postId: number, @Body() applyJobDto: ApplyJobDTO) {
    return this.userService.applyJob(postId, applyJobDto);
  }

  @Delete('apply/delete/:userId/:postId')
  deleteApplication(
    @Param('userId') userId: string,
    @Param('postId') postId: number,
  ) {
    return this.userService.deleteApplication(userId, postId);
  }

  @Get('applyList/:userId')
  getApplyList(@Param('userId') userId: string) {
    return this.userService.getApplyList(userId);
  }
}
