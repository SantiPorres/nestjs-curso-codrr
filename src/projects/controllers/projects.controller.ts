import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@ApiTags('Projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectServices: ProjectsService) {}

    @Roles('CREATOR')
    @Post('user-owner/:userId')
    public async registerProject(
        @Body() body: ProjectDTO,
        @Param('userId') userId: string
    ) {
        const project = await this.projectServices.createProject(body, userId);
        return project;
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


    // Rick and Morty API
    @ApiHeader({
        name: 'api_token'
    })
    @Get('rick')
    public async listApi() {
        console.log('Hello')
        return await this.projectServices.listApi();
    }
}
