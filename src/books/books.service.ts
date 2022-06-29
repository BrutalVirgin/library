import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/db/schemas/books.shema';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async addBook(body: CreateBookDto, date: Date) {
    const book = await this.bookModel.findOne({ title: body.title });

    if (book)
      throw new HttpException('Book already exists', HttpStatus.FORBIDDEN);

    const updateData = {
      title: body.title,
      author: body.author,
      createdAt: date,
    };

    try {
      return await this.bookModel.create(updateData);
    } catch {
      throw new HttpException('Book validation failed', HttpStatus.FORBIDDEN);
    }
  }

  async findBookById(bookid: string) {
    const book = await this.bookModel.findOne({ _id: bookid });

    if (!book)
      throw new HttpException(
        'There is no book with this id',
        HttpStatus.NOT_FOUND,
      );

    return book;
  }
}
