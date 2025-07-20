import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: "password must contain at least one letter and one number",
  })
  password: string;
}
