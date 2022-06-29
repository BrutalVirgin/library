import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserDocument } from 'src/db/schemas/users.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dtos/Update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: CreateUserDto) {
    try {
      return await this.userModel.create(data);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userModel.findById(id);
    } catch {
      throw new NotFoundException('User not found');
    }
    await this.userModel.findByIdAndDelete(id);
    return `user with id: ${id} was deleted`;
  }

  async updateUser(id: string, body: UpdateUserDto, updatedAt: Date) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateData = {
      name: body.name ? body.name : user.name,
      email: body.email ? body.email : user.email,
      password: body.password ? body.password : user.password,
      updatedAt: updatedAt,
    };

    await this.userModel.updateOne({ id }, updateData);

    return await this.userModel.findOne({ id });
  }

  async findUserById(id: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addBookToUser(userid: string, bookid: string) {
    const user = await this.userModel.findOne({ _id: userid });

    if (user.books.includes(bookid, 0)) {
      throw new HttpException(
        'User already have this book',
        HttpStatus.FORBIDDEN,
      );
    } else {
      user.books.push(bookid);
    }

    await this.userModel.updateOne({ userid }, { books: user.books });
  }
}
