import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private readonly rounds = 10;
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.users.findByUsername(dto.username);
    if (existing) throw new ConflictException("Username already taken");
    const hash = await bcrypt.hash(dto.password, this.rounds);
    const user = await this.users.create(dto.username, hash);
    return this.signToken(user.id, user.username);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByUsername(dto.username);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");
    return this.signToken(user.id, user.username);
  }

  private async signToken(userId: string, username: string) {
    const payload = { sub: userId, username };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, user: { id: userId, username } };
  }
}
