/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsOptional, IsString, MinLength, MaxLength } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(160)
  description?: string;
}
