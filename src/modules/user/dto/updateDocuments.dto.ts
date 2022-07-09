import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentsDTO } from './createDocuments.dto';

export class UpdateDocumentsDTO extends PartialType(CreateDocumentsDTO) {}
