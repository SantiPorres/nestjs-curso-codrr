import { TaskEntity } from "../../tasks/entities/tasks.entity";
import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UserProjectEntity } from "../../users/entities/usersProjects.entity";
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({name: 'projects'})
export class ProjectEntity extends BaseEntity implements IProject {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(
        ()=> UserProjectEntity, 
        (userProject)=> userProject.project,
    )
    usersIncludes: UserProjectEntity[]

    @OneToMany(
        ()=> TaskEntity,
        (tasks)=> tasks.project
    )
    tasks: TaskEntity[]
}