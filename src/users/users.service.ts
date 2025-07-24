import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { User, UserRole } from "./interfaces/user.interface";

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    // Create default admin user if no admin exists
    const adminExists = this.users.find((user) => user.username === "admin");
    if (!adminExists) {
      const adminUser: User = {
        id: uuid(),
        username: "admin",
        passwordHash:
          "$2b$10$TBwUqkgDgu97kdjlFYxq3eBL/xVVkGgDGp1u3cyv0kQVl1NoLJA9S", // password: admin123
        role: UserRole.ADMIN,
        createdAt: new Date(),
      };
      this.users.push(adminUser);
      console.log(
        "✅ Default admin user created: username=admin, password=admin123"
      );
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  }

  async create(
    username: string,
    passwordHash: string,
    role: UserRole = UserRole.USER
  ): Promise<User> {
    const user: User = {
      id: uuid(),
      username,
      passwordHash,
      role,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      passwordHash: user.passwordHash, // Only for internal use
    }));
  }

  async getPublicUsers(): Promise<Omit<User, "passwordHash">[]> {
    return this.users.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }

  // Admin: Create a new user with specified role
  async createUserByAdmin(
    username: string,
    passwordHash: string,
    role: UserRole
  ): Promise<User> {
    const existing = await this.findByUsername(username);
    if (existing) {
      throw new Error("Username already exists");
    }
    return this.create(username, passwordHash, role);
  }

  // Admin: Delete a user by ID
  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Prevent deleting the last admin
    const user = this.users[userIndex];
    if (user.role === UserRole.ADMIN) {
      const adminCount = this.users.filter(
        (u) => u.role === UserRole.ADMIN
      ).length;
      if (adminCount <= 1) {
        throw new Error("Cannot delete the last admin user");
      }
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  // Admin: Update user role
  async updateUserRole(id: string, newRole: UserRole): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const user = this.users[userIndex];

    // Prevent removing admin role from the last admin
    if (user.role === UserRole.ADMIN && newRole !== UserRole.ADMIN) {
      const adminCount = this.users.filter(
        (u) => u.role === UserRole.ADMIN
      ).length;
      if (adminCount <= 1) {
        throw new Error("Cannot remove admin role from the last admin user");
      }
    }

    this.users[userIndex] = { ...user, role: newRole };
    return this.users[userIndex];
  }

  // Get user count by role
  async getUserStats(): Promise<{
    total: number;
    admins: number;
    users: number;
  }> {
    const total = this.users.length;
    const admins = this.users.filter((u) => u.role === UserRole.ADMIN).length;
    const users = this.users.filter((u) => u.role === UserRole.USER).length;
    return { total, admins, users };
  }
}
