import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private rolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
