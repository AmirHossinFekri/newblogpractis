import { IsNotEmpty, IsString } from 'class-validator';

export class articleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNotEmpty()
  description: string;
}
