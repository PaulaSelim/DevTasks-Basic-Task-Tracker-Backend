import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  signUp() {
    return { msg: "I am sign up" };
  }
  signIn() {
    return { msg: "I am sign in" };
  }
}
