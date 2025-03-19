import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";
import { TasksQueryDto } from "./task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(query : TasksQueryDto): Task[] {
    const {status,page,limit} = query
    let filteredTasks: Task[] = this.tasks;
    if( status ) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    const startIndex = (page - 1) * limit;
    return filteredTasks.slice(startIndex, startIndex + limit);
  }

  getTaskById(id: string): Task  {
   const task: Task = this.tasks.find((task) => task.id === id);
   if (!task) {
     throw new NotFoundException("Task not found");
   }
   return task;
  }

  createTask(task: Task): Task {
    const newTask = {id: (this.tasks.length + 1).toString() ,...task}
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {...this.tasks[taskIndex],...update};
    } else if (taskIndex === -1) {
      throw new NotFoundException("Task for updating is not found");
    }
    return this.tasks[taskIndex]
  }

  deleteTask(id: string): Task {

    const deletedTask = this.tasks.find((task) => task.id === id);
    if (deletedTask) {
      this.tasks= this.tasks.filter((task) => task.id !== id);
    } else {
      throw new NotFoundException("Task for deletion not found");
    }
    return deletedTask
  }
}
