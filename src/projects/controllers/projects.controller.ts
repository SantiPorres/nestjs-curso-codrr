import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';

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

    @Get(':id')
    public async findProjectById(@Param('id') id: string) {
        return await this.projectServices.findProjectById(id);
    }

    @Patch(':id')
    public async updateProject(@Param('id') id: string, @Body() body: ProjectUpdateDTO) {
        return await this.projectServices.updateProject(body, id);
    }

    @Delete(':id')
    public async deleteProject(@Param('id') id: string) {
        return await this.projectServices.deleteProject(id);
    }
}
