import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(160)
  description: string; // allow up to 160 for flexibility
}
