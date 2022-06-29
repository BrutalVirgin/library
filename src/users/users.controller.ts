import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/Update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/addUser')
  async addUser(@Body() body: CreateUserDto) {
    try {
      const data = { ...body, createdAt: new Date() };
      return await this.userService.createUser(data);
    } catch (err) {
      throw err;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      const updatedAt = new Date();
      return await this.userService.updateUser(id, body, updatedAt);
    } catch (err) {
      throw err;
    }
  }
}
