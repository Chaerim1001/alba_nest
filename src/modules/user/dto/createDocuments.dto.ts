import { IsString } from 'class-validator';

export class CreateDocumentsDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
