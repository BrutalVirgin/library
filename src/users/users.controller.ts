import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/Update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private bookService: BooksService,
  ) {}

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

  @Get('/:userid/books')
  async getBookList(@Param('userid') userid: string) {
    try {
      const books = await this.userService.findUserBookList(userid);
      return await this.bookService.findListOfBooks(books);
    } catch (err) {
      throw err;
    }
  }
}
