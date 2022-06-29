import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookShema } from 'src/db/schemas/books.shema';
import { CheckIdMiddleware } from 'src/errors/id-validation';
import { UsersModule } from 'src/users/users.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Book.name, schema: bookShema }]),
  ],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(BooksController);
  }
}
