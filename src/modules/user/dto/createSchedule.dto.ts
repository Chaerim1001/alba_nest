import { IsString, IsDate } from 'class-validator';

export class CreateScheduleDTO {
  @IsDate()
  scheduleDate: Date;

  @IsString()
  content: string;
}
