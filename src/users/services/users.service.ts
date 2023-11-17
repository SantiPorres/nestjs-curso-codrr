import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UserProjectEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) 
      private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserProjectEntity) 
      private readonly userProjectRepository: Repository<UserProjectEntity>
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.save(body);
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      if(users.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'There were not results found'
        });
      }
      return users;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({id})
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();
      if(!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'The user was not found'
        });
      }
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id, body
      );
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'The user could not be updated'
        });
      }
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'The user could not be deleted'
        });
      }
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToProject(body: UserToProjectDTO) {
    try {
      return await this.userProjectRepository.save(body);
    } catch(error) {
      throw ErrorManager.createSignatureError(error);
    }
  }
}
