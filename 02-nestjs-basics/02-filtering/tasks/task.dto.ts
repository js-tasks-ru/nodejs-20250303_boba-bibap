import { IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";
import { TaskStatus } from "./task.model";
import { Type } from "class-transformer";

export class TasksQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsEnum(['title', 'status'])
  sortBy?: 'title' | 'status';
}
