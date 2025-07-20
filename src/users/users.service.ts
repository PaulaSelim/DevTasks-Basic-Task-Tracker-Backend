import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { v4 as uuid } from "uuid";

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(username: string, passwordHash: string): Promise<User> {
    const user: User = {
      id: uuid(),
      username,
      passwordHash,
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
}
