import { Module } from "@nestjs/common";
import { AdminGuard } from "../common/guards/admin.guard";
import { UsersModule } from "../users/users.module";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [TasksService, AdminGuard],
})
export class TasksModule {}
