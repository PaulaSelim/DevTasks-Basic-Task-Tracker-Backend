import { Injectable } from "@nestjs/common";
// import { User, Task } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signUp(dto: AuthDto) {
    return dto;
  }
  signIn() {
    return { msg: "I am sign in" };
  }
}
