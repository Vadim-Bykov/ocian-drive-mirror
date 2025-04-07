import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserDto } from './dto/user.dto';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userModel.find().exec();
      return users.map((user) => getUserDto(user));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new BadRequestException(
          `User with email: ${email} was not found`,
        );
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();

      if (!user) {
        throw new BadRequestException(`User with id: ${id} was not found`);
      }
      return getUserDto(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
