import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApplyJobDTO } from './dto/applyJob.dto';
import { UserService } from './user.service';
import { CreateDocumentsDTO } from './dto/createDocuments.dto';
import { UpdateDocumentsDTO } from './dto/updateDocuments.dto';
import { CreateScheduleDTO } from './dto/createSchedule.dto';
import { UpdateScheduleDTO } from './dto/updateSchedule.dto';

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

  @Get('documents/:userId')
  getApplicationDocuments(@Param('userId') userId: string) {
    return this.userService.getApplicationDocuments(userId);
  }

  @Post('documents/:userId')
  createApplicationDocuments(
    @Param('userId') userId: string,
    @Body() createDocumentsDto: CreateDocumentsDTO,
  ) {
    return this.userService.createApplicationDocuments(
      userId,
      createDocumentsDto,
    );
  }

  @Patch('documents/:userId')
  updateApplicationDocuments(
    @Param('userId') userId: string,
    @Body() updateDocumentsDto: UpdateDocumentsDTO,
  ) {
    return this.userService.updateApplicationDocuments(
      userId,
      updateDocumentsDto,
    );
  }

  @Post('schedule/:userId')
  createSchedule(
    @Param('userId') userId: string,
    @Body() createScheduleDTO: CreateScheduleDTO,
  ) {
    return this.userService.createSchedule(userId, createScheduleDTO);
  }

  @Patch('schedule/:scheduleId/:userId')
  updateSchedule(
    @Param('scheduleId') scheduleId: number,
    @Param('userId') userId: string,
    @Body()
    updateScheduleDTO: UpdateScheduleDTO,
  ) {
    return this.userService.updateSchedule(
      scheduleId,
      userId,
      updateScheduleDTO,
    );
  }
}
