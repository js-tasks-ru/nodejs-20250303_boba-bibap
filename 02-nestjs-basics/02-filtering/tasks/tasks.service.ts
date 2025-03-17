import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { TasksQueryDto } from "./task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    }
  ];

  getFilteredTasks(query : TasksQueryDto): Task[] {
    const {status,page,limit, sortBy} = query
    let filteredTasks: Task[] = this.tasks;
    if( status ) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    if (sortBy) {
      filteredTasks.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    if(page && limit) {
      const startIndex = (page - 1) * limit;
      return filteredTasks.slice(startIndex, startIndex + limit);
    }

    return filteredTasks;

  }
}
