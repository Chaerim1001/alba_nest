import { IsString } from 'class-validator';

export class CreateStoreDTO {
  @IsString()
  readonly storeName: string;

  @IsString()
  readonly storeNumber: string;

  @IsString()
  readonly startDate: string;
}
