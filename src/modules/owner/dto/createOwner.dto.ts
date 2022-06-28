import { IsString } from 'class-validator';

export class CreateOwnerDTO {
  @IsString()
  readonly ownerId: string;

  @IsString()
  readonly pwd: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phoneNumber: string;

  @IsString()
  readonly name: string;
}
