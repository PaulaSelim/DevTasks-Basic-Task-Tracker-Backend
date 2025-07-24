import { IsEnum } from "class-validator";
import { UserRole } from "../interfaces/user.interface";

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
