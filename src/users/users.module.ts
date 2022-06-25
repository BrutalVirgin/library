import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userShema } from 'src/db/schemas/users.shema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userShema }]),
  ],
})
export class UsersModule {}
