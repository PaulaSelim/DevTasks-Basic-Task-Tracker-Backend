import {
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(160)
  description: string; // allow up to 160 for flexibility

  @IsOptional()
  @IsISO8601()
  dueDate?: string; // ISO8601 string, optional
}
