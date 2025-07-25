import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { UserRole } from "../users/interfaces/user.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "./entities/task.entity";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Create a new task for a specific user
  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = {
      id: uuid(),
      name: createTaskDto.name,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
      userId,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  // Get all tasks for a specific user
  async findAllByUser(userId: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.userId === userId);
  }

  // Get all tasks (admin only)
  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  // Find a specific task by ID, ensuring user ownership or admin access
  async findOne(id: string, userId: string, userRole: UserRole): Promise<Task> {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Allow access if user owns the task or is admin
    if (task.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException("Access denied to this task");
    }

    return task;
  }

  // Update a task, ensuring user ownership or admin access
  async update(
    id: string,
    userId: string,
    userRole: UserRole,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const task = this.tasks[taskIndex];

    // Allow access if user owns the task or is admin
    if (task.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException("Access denied to this task");
    }

    // Update task properties, always preserve name/description/dueDate if not provided
    const updatedTask = {
      ...task,
      ...updateTaskDto,
      name: updateTaskDto.name !== undefined ? updateTaskDto.name : task.name,
      description:
        updateTaskDto.description !== undefined
          ? updateTaskDto.description
          : task.description,
      dueDate:
        updateTaskDto.dueDate !== undefined
          ? updateTaskDto.dueDate
            ? new Date(updateTaskDto.dueDate)
            : null
          : task.dueDate,
      updatedAt: new Date(),
    };

    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  // Delete a task, ensuring user ownership or admin access
  async remove(id: string, userId: string, userRole: UserRole): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const task = this.tasks[taskIndex];

    // Allow access if user owns the task or is admin
    if (task.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException("Access denied to this task");
    }

    this.tasks.splice(taskIndex, 1);
  }

  // Get tasks by status for a user
  async findByStatus(userId: string, status: TaskStatus): Promise<Task[]> {
    return this.tasks.filter(
      (task) => task.userId === userId && task.status === status
    );
  }

  // Admin: Get all tasks for all users
  async findAllForAdmin(): Promise<Task[]> {
    return this.tasks;
  }
}
