import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TaskDTO } from '../dto/task.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {

    constructor(
        private readonly tasksService: TasksService
    ) {}

    @AccessLevel(30)
    @Post('project/:projectId')
    public async createTask(
        @Body() body: TaskDTO, 
        @Param('projectId') projectId: string
    ) {
        return await this.tasksService.createTask(body, projectId);
    }
}
