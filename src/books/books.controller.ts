import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    private bookService: BooksService,
    private userService: UsersService,
  ) {}

  @Post()
  async addBook(@Body() body: CreateBookDto) {
    try {
      const date = new Date();
      return await this.bookService.addBook(body, date);
    } catch (err) {
      throw err;
    }
  }

  @Post('/:userid/:bookid')
  async addBookToUser(@Param() params) {
    try {
      const user = await this.userService.findUserById(params.userid);
      const book = await this.bookService.findBookById(params.bookid);

      if (user && book) {
        await this.userService.addBookToUser(params.userid, params.bookid);
      }

      return await this.userService.findUserById(params.userid);
    } catch (err) {
      throw err;
    }
  }
}
