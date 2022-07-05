import { Controller, Post, Body } from '@nestjs/common';
import { ApplyJobDTO } from './dto/applyJob.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('apply')
  applyJob(@Body() applyJobDto: ApplyJobDTO) {
    return this.userService.applyJob(applyJobDto);
  }
}
