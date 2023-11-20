import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/projects.entity';
import { UserProjectEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      UserProjectEntity
    ]),
    ProvidersModule
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    UsersService,
    HttpCustomService
  ]
})
export class ProjectsModule {}
