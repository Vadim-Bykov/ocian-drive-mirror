import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './users.service';
import { RoleEnum } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';

const UserExample: UserDto = {
  _id: '67efcab4b388d42bb5bf6286',
  email: 'email@gmail.com',
  password: '123456',
  roles: [RoleEnum.User, RoleEnum.Admin],
  createdAt: '2025-04-04T12:56:19.903Z',
  updatedAt: '2025-04-04T12:56:19.903Z',
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    type: UserDto,
    example: UserExample,
    description: 'User has been created',
  })
  @Roles(RoleEnum.User)
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.userService.createUser(userDto);
    return user;
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
    example: [UserExample],
  })
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get one users' })
  async getUserById(@Param('id') id: string) {
    const users = await this.userService.getUserById(id);
    return users;
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get one user by email' })
  @ApiResponse({
    status: 200,
    type: UserDto,
    example: [UserExample],
  })
  @ApiOperation({ summary: 'Get one user' })
  async getUserByEmail(@Param('email') email: string) {
    console.log({ email });

    const users = await this.userService.getUserByEmail(email);
    return users;
  }
}
