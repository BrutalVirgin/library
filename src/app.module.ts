import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';

dotenv.config({ path: __dirname + '../.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    BooksModule,
    MongooseModule.forRoot(process.env.MONGOURL as string),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
