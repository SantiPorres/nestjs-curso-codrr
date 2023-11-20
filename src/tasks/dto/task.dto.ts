import { STATUS_TASK } from "src/constants/status-task";
import { Entity } from "typeorm";
import { ProjectDTO } from "src/projects/dto/project.dto";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'task'})
export class TaskDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    responsibleName: string;

    @ApiProperty()
    @IsOptional()
    project: ProjectDTO;
}