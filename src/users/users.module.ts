import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from 'src/books/books.module';
import { User, userShema } from 'src/db/schemas/users.shema';
import { CheckIdMiddleware } from 'src/middlewares/id-validation';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    forwardRef(() => BooksModule),
    // BooksModule,
    MongooseModule.forFeature([{ name: User.name, schema: userShema }]),
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes(UsersController);
  }
}
