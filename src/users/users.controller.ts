import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

export const UserExample: UserDto = {
  id: '67efcab4b388d42bb5bf6286',
  email: 'email@gmail.com',
  password: '123456',
  // roles: [RoleEnum.User, RoleEnum.Admin, RoleEnum.Manager],
  createdAt: '2025-04-04T12:56:19.903Z',
  updatedAt: '2025-04-04T12:56:19.903Z',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZyIsImlkIjoiNjdmMzhkMmNmYmM3MjBiZjM1MDIyYzdlIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTUyMzcsImV4cCI6MTc0NDEwMTYzN30.eEV89O1ZRMlGEYE7CH4JGhTpR1FCMzfGrFvXl9xKVeI',
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  // @UseGuards(RolesGuard)
  // @Roles(RoleEnum.Admin, RoleEnum.Manager)
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
  async getUserById(@Param('id') id: string) {
    try {
      const users = await this.userService.getUserById(id);
      return users;
    } catch (error) {
      throw new BadRequestException(error);
    }
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
    const users = await this.userService.getUserByEmail(email);
    return users;
  }
}
