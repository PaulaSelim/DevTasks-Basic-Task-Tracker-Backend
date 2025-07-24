import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { UserRole } from "../../users/interfaces/user.interface";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    const fullUser = await this.usersService.findById(user.userId);

    if (!fullUser || fullUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException("Admin access required");
    }

    return true;
  }
}
