import { IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  content: string;
}
