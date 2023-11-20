import { STATUS_TASK } from "src/constants/status-task";
import { Entity } from "typeorm";
import { ProjectDTO } from "src/projects/dto/project.dto";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Entity({name: 'task'})
export class TaskDTO {
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @IsNotEmpty()
    @IsString()
    taskDescription: string;

    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;

    @IsNotEmpty()
    @IsString()
    responsibleName: string;

    @IsOptional()
    project: ProjectDTO;
}