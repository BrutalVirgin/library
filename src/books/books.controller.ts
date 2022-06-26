import { Body, Controller, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  async addBook(@Body() body: CreateBookDto) {
    try {
      const date = new Date();
      return await this.bookService.addBook(body, date);
    } catch (err) {
      throw err;
    }
  }

  @Post('/:userid/:id')
  async addBookToUser(
    @Param('userid') @Param('id') id: string,
    userid: string,
  ) {}
}
