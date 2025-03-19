import { Injectable, NotFoundException} from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import {NotificationsService} from "../notifications/notifications.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor (
      private readonly _notificationsService: NotificationsService,
      private readonly _usersService: UsersService
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    const user = assignedTo ? this._usersService.getUserById(assignedTo) : null;

    if (!user) {
      throw new NotFoundException();
    }

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    await this._notificationsService.sendEmail(user.email, "Новая задача", `Вы назначены ответственным за задачу: "${title}"`)
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    const user = task?.assignedTo ? this._usersService.getUserById(task.assignedTo) : null
    if (!user) {
      throw new NotFoundException();
    }
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);
    await this._notificationsService.sendSMS(user.phone, `Статус задачи "${task.title}" обновлён на "${task.status}"`)
    return task;
  }
}
