import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "../common/decorators/user.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private auth: AuthService,
    private usersService: UsersService
  ) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    const fullUser = await this.usersService.findById(user.userId);
    if (!fullUser) {
      throw new NotFoundException("User not found");
    }
    return {
      id: fullUser.id,
      username: fullUser.username,
      role: fullUser.role,
      createdAt: fullUser.createdAt,
    };
  }
}
