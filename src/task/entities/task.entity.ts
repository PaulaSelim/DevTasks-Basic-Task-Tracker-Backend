export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export class Task {
  id: string; // uuid
  name: string;
  description: string; // ~100 chars
  status: TaskStatus;
  userId: string; // Owner of the task
  dueDate: Date | null; // <-- new field
  createdAt: Date;
  updatedAt: Date;
}
