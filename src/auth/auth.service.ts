import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  private readonly rounds = 10;
  constructor(
    private users: UsersService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.users.findByUsername(dto.username);
    if (existing) throw new ConflictException("Username already taken");
    const hash = await bcrypt.hash(dto.password, this.rounds);
    const user = await this.users.create(dto.username, hash);
    return this.signToken(user.id, user.username, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByUsername(dto.username);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");
    return this.signToken(user.id, user.username, user.role);
  }

  private async signToken(userId: string, username: string, role: string) {
    const payload = { sub: userId, username, role };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, user: { id: userId, username, role } };
  }
}
