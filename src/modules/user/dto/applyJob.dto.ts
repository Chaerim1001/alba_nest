import { IsNumber, IsString } from 'class-validator';

export class ApplyJobDTO {
  @IsString()
  userId: string;

  @IsNumber()
  storeId: number;
}
