export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}
