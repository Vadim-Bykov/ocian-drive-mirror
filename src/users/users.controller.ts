import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

export const UserExample: UserDto = {
  id: '67efcab4b388d42bb5bf6286',
  email: 'email@gmail.com',
  password: '123456',
  roles: [RoleEnum.User, RoleEnum.Admin, RoleEnum.Manager],
  createdAt: '2025-04-04T12:56:19.903Z',
  updatedAt: '2025-04-04T12:56:19.903Z',
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Manager)
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
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
