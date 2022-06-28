import { IsInt, IsString } from 'class-validator';

export class RegisterStoreDTO {
  @IsString()
  readonly storeName: string;

  @IsString()
  readonly storeNumber: string;

  @IsString()
  readonly startDate: string;

  @IsInt()
  readonly ownerId: number;
}
