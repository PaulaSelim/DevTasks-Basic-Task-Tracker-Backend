/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./entities/task.entity";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    if (this.tasks.length) return;
    const seedData: Array<Pick<Task, "name" | "description">> = [
      {
        name: "Audit dependencies",
        description:
          "Review and prune unused packages to reduce bundle size and mitigate potential security exposure.",
      },
      {
        name: "Update README",
        description:
          "Expand project usage instructions and clarify environment setup for new contributors joining rapidly.",
      },
      {
        name: "Add logging layer",
        description:
          "Integrate a minimal structured logger to capture errors and key lifecycle events cleanly.",
      },
      {
        name: "Refactor auth module",
        description:
          "Simplify authentication flow, removing duplicated validation branches and improving clarity overall.",
      },
      {
        name: "Introduce caching",
        description:
          "Prototype an in-memory cache abstraction to reduce repeated expensive external service lookups.",
      },
      {
        name: "Optimize images",
        description:
          "Batch compress static image assets to shrink payload size and accelerate initial page rendering noticeably.",
      },
      {
        name: "Write test plan",
        description:
          "Draft a concise test strategy specifying scope, tools, metrics, and prioritization across core components.",
      },
      {
        name: "Pagination support",
        description:
          "Implement simple cursor based pagination endpoints to efficiently navigate large task collections.",
      },
      {
        name: "Health endpoint",
        description:
          "Expose a lightweight health check that validates core services and dependency availability promptly.",
      },
      {
        name: "Error catalog",
        description:
          "Compile a documented list of error codes with remediation guidance to streamline debugging activities.",
      },
      {
        name: "Security headers",
        description:
          "Add recommended HTTP security headers configuration to strengthen baseline defense in production.",
      },
      {
        name: "CI configuration",
        description:
          "Set up a minimal continuous integration workflow running linting and tests on every pull request automatically.",
      },
      {
        name: "Secrets rotation",
        description:
          "Plan a secrets rotation procedure including schedule, tooling, and rollback contingencies for safety.",
      },
      {
        name: "Accessibility pass",
        description:
          "Evaluate UI components against accessibility guidelines and record actionable remediation tasks clearly.",
      },
      {
        name: "Performance metrics",
        description:
          "Instrument basic performance timers to observe request latency distributions and identify bottlenecks early.",
      },
      {
        name: "Localization prep",
        description:
          "Externalize user facing strings into a resource structure to enable future localization contributions easily.",
      },
      {
        name: "Session timeout UX",
        description:
          "Design and prototype a graceful session timeout notification with recovery flow before forced logout occurs.",
      },
      {
        name: "Database abstraction",
        description:
          "Sketch an interface layer isolating persistence concerns to simplify migration to a real database later.",
      },
      {
        name: "Backup procedure",
        description:
          "Document a repeatable backup and restore checklist ensuring critical data resilience expectations are met.",
      },
      {
        name: "Threat modeling",
        description:
          "Conduct a lightweight threat modeling session and summarize prioritized mitigations for near term scheduling.",
      },
    ];
    this.tasks = seedData.map((d) => ({
      id: uuid(),
      name: d.name,
      description: d.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      name: dto.name,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  update(id: string, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    if (dto.name) task.name = dto.name;
    if (dto.description) task.description = dto.description;
    task.updatedAt = new Date();
    return task;
  }

  remove(id: string): { deleted: boolean } {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException("Task not found");
    this.tasks.splice(index, 1);
    return { deleted: true };
  }
}
