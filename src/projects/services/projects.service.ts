import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UserProjectEntity } from 'src/users/entities/usersProjects.entity';
import { ACCESS_LEVEL } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';
import { UserEntity } from 'src/users/entities/users.entity';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
        @InjectRepository(UserProjectEntity) private readonly userProjectRepository: Repository<UserProjectEntity>,
        private readonly usersService: UsersService
    ) {}

    public async createProject(body: ProjectDTO, userId: string): Promise<ProjectEntity> {
        try {

            const project: ProjectEntity = await this.projectRepository.save(body);
            
            const user: UserEntity = await this.usersService.findUserById(userId);

            await this.userProjectRepository.save({
                accessLevel: ACCESS_LEVEL.OWNER,
                user: user,
                project: project
            });
            
            return project;
        } catch(error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findProjects(): Promise<ProjectEntity[]> {
        try {
            const projects: ProjectEntity[] = await this.projectRepository.find();
            if (projects.length === 0) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'There were not projects found'
                })
            }
            return projects;
        } catch(error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findProjectById(id: string): Promise<ProjectEntity> {
        try {
            const project: ProjectEntity = await this.projectRepository
                .createQueryBuilder('project')
                .where({id})
                .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
                .leftJoinAndSelect('usersIncludes.user', 'user')
                .getOne();
            if (!project) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'The project was not found'
                });
            }
            return project;
        }   catch(error) {
                throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult> {
        try {
            const project: UpdateResult = await this.projectRepository.update(
                id,
                body
            );
            if (project.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'It was not posible to update the project'
                })
            }
            return project;
        } catch(error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteProject(id: string): Promise<DeleteResult> {
        try {
            const project: DeleteResult = await this.projectRepository.delete(id);
            if (project.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'It was not posible to delete the project'
                });
            }
            return project;
        } catch(error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
