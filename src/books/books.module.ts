import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookShema } from 'src/db/schemas/books.shema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: bookShema }]),
  ],
})
export class BooksModule {}
