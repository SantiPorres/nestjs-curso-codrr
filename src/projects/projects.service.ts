import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from './dto/project.dto';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>
    ) {}

    public async createProject(body: ProjectDTO): Promise<ProjectEntity> {
        try {
            return await this.projectRepository.save(body);
        } catch(error) {
            throw new Error(error);
        }
    }

    public async findProjects(): Promise<ProjectEntity[]> {
        try {
            return await this.projectRepository.find();
        } catch(error) {
            throw new Error(error);
        }
    }

    public async findProjectById(id: string): Promise<ProjectEntity> {
        try {
            return await this.projectRepository
                .createQueryBuilder('project')
                .where({id})
                .getOne();
        } catch(error) {
            throw new Error(error);
        }
    }

    public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult> {
        try {
            const project: UpdateResult = await this.projectRepository.update(
                id,
                body
            );
            if (project.affected === 0) {
                return undefined;
            }
            return project;
        } catch(error) {
            throw new Error(error);
        }
    }

    public async deleteProject(id: string): Promise<DeleteResult> {
        try {
            const project: DeleteResult = await this.projectRepository.delete(id);
            if (project.affected === 0) {
                return undefined;
            }
            return project;
        } catch(error) {
            throw new Error(error);
        }
    }
}
