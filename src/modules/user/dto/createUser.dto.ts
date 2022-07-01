import { IsDate, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  userId: string;

  @IsString()
  readonly pwd: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phoneNumber: string;

  @IsString()
  readonly name: string;

  @IsDate()
  readonly birth: Date;
}
