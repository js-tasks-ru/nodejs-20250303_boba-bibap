import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksQueryDto } from "./task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query(new ValidationPipe({transform: true})) query: TasksQueryDto) {
    return this.tasksService.getFilteredTasks(query);
  }
}
