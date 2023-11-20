import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectServices: ProjectsService) {}

    @Post()
    public async registerProject(@Body() body: ProjectDTO) {
        return await this.projectServices.createProject(body);
    }
    
    @Get()
    public async findAllProjects() {
        return await this.projectServices.findProjects();
    }

    @Get(':projectId')
    public async findProjectById(@Param('projectId') id: string) {
        return await this.projectServices.findProjectById(id);
    }

    @AccessLevel(50)
    @Patch(':projectId')
    public async updateProject(@Param('projectId') id: string, @Body() body: ProjectUpdateDTO) {
        return await this.projectServices.updateProject(body, id);
    }

    @Delete(':projectId')
    public async deleteProject(@Param('projectId') id: string) {
        return await this.projectServices.deleteProject(id);
    }
}
