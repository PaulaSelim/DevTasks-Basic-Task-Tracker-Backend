/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from "@nestjs/mapped-types";
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { TaskStatus } from "../entities/task.entity";
import { CreateTaskDto } from "./create-task.dto";

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

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
