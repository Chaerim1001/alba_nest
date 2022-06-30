import { IsString } from 'class-validator';

export class LoginOwnerDTO {
  @IsString()
  readonly ownerId: string;

  @IsString()
  readonly pwd: string;
}
