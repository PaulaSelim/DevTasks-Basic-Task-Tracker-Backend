import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      datasources: {
        db: {
          url: "postgresql://postgres:123@localhost:5433/nest?schema=public",
        },
      },
    });
  }
}
