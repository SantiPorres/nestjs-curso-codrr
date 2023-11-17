import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post('')
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @Get('')
    public async findAllUsers() {
        return await this.usersService.findUsers();
        
    }

    @Get(':id')
    public async findUserById(@Param('id') id: string) {
        return await this.usersService.findUserById(id);
    }

    @Patch(':id')
    public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO) {
        return await this.usersService.updateUser(body, id);
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }

    // Relation user-project
    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDTO) {
        return await this.usersService.relationToProject(body);
    }
}
