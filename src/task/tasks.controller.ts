import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "../common/decorators/user.decorator";
import { AdminGuard } from "../common/guards/admin.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskStatus } from "./entities/task.entity";
import { TasksService } from "./tasks.service";

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: any, @Query("status") status?: TaskStatus) {
    if (status) {
      return this.tasksService.findByStatus(user.userId, status);
    }
    return this.tasksService.findAllByUser(user.userId);
  }

  @Get("admin/all")
  @UseGuards(AdminGuard)
  findAllForAdmin() {
    return this.tasksService.findAllForAdmin();
  }

  @Get(":id")
  findOne(@CurrentUser() user: any, @Param("id") id: string) {
    return this.tasksService.findOne(id, user.userId, user.role);
  }

  @Patch(":id")
  update(
    @CurrentUser() user: any,
    @Param("id") id: string,
    @Body() dto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, user.userId, user.role, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: any, @Param("id") id: string) {
    return this.tasksService.remove(id, user.userId, user.role);
  }
}
