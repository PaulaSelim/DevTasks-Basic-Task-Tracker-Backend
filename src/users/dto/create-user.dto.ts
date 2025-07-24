import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserRole } from "../interfaces/user.interface";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;
}
