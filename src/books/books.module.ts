import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookShema } from 'src/db/schemas/books.shema';
import { CheckIdMiddleware } from 'src/middlewares/id-validation';
import { UsersModule } from 'src/users/users.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [
    forwardRef(() => UsersModule),
    // UsersModule,
    MongooseModule.forFeature([{ name: Book.name, schema: bookShema }]),
  ],
  exports: [BooksService],
})
export class BooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(BooksController);
  }
}
