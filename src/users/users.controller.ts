import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";
import { UserRole } from "./interfaces/user.interface";
import { UsersService } from "./users.service";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Admin: Get all users
  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    return this.usersService.getPublicUsers();
  }

  // Admin: Get user statistics
  @Get("stats")
  @UseGuards(AdminGuard)
  async getStats() {
    return this.usersService.getUserStats();
  }

  // Admin: Create a new user
  @Post()
  @UseGuards(AdminGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.createUserByAdmin(
      createUserDto.username,
      passwordHash,
      createUserDto.role || UserRole.USER
    );

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  // Admin: Update user role
  @Patch(":id/role")
  @UseGuards(AdminGuard)
  async updateUserRole(
    @Param("id") id: string,
    @Body() updateRoleDto: UpdateUserRoleDto
  ) {
    const user = await this.usersService.updateUserRole(id, updateRoleDto.role);
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  // Temporary: Promote first user to admin (for testing only)
  @Post("make-first-admin")
  async makeFirstAdmin() {
    try {
      const users = await this.usersService.findAll();
      if (users.length === 0) {
        return { message: "No users found" };
      }

      const firstUser = users[0];
      const updatedUser = await this.usersService.updateUserRole(
        firstUser.id,
        UserRole.ADMIN
      );

      return {
        message: "First user promoted to admin",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          role: updatedUser.role,
        },
      };
    } catch (error) {
      return { message: "Error promoting user", error: error.message };
    }
  }

  // Admin: Delete a user
  @Delete(":id")
  @UseGuards(AdminGuard)
  async deleteUser(@Param("id") id: string) {
    await this.usersService.deleteUser(id);
    return { message: "User deleted successfully" };
  }
}
