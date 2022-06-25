import {
  ForbiddenException,
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
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, body: UpdateUserDto) {
    try {
      await this.userModel.findById(id);
    } catch {
      throw new NotFoundException('User not found');
    }

    await this.userModel.findByIdAndUpdate(id, body);

    return await this.userModel.findById(id);
  }
}
