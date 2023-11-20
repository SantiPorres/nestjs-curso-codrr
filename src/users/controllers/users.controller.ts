import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post('')
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @Roles('BASIC')
    @Get('')
    public async findAllUsers() {
        const users = await this.usersService.findUsers();
        return users;
    }

    @PublicAccess()
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
    @Roles('ADMIN')
    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDTO) {
        return await this.usersService.relationToProject(body);
    }
}
