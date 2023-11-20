import { STATUS_TASK } from "../../constants/status-task";
import { BaseEntity } from "../../config/base.entity";
import { ProjectEntity } from "../../projects/entities/projects.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @Column()
    taskName: string;

    @Column()
    taskDescription: string;

    @Column({type: 'enum', enum: STATUS_TASK})
    status: STATUS_TASK;

    @Column()
    responsibleName: string;

    @ManyToOne(
        ()=> ProjectEntity, 
        (project)=> project.tasks
    )
    @JoinColumn({name: 'project_id'})
    project: ProjectEntity;
}