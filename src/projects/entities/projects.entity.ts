import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UserProjectsEntity } from "../../users/entities/usersProjects.entity";
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({name: 'projects'})
export class ProjectEntity extends BaseEntity implements IProject {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(
        ()=> UserProjectsEntity, 
        (usersProjects)=> usersProjects.project,
    )
    usersIncludes: UserProjectsEntity[]
}