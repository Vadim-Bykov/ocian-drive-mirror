import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto, RoleDto } from './role.dto';
import { RoleEnum } from './role.enum';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

const RoleExample: RoleDto = {
  id: '67efcab4b388d42bb5bf6286',
  value: RoleEnum.User,
  createdAt: '2025-04-04T12:56:19.903Z',
  updatedAt: '2025-04-04T12:56:19.903Z',
};

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  @ApiOperation({ summary: 'Create role' })
  @ApiCreatedResponse({
    type: RoleDto,
    example: RoleExample,
  })
  async createRole(@Body() roleDto: CreateRoleDto) {
    const user = await this.rolesService.createRole(roleDto);
    return user;
  }

  @Get(':role')
  @ApiOperation({ summary: 'Get role' })
  @ApiResponse({
    status: 200,
    type: RoleDto,
    example: RoleExample,
  })
  async getRoleByValue(@Param('role') value: RoleEnum) {
    const role = await this.rolesService.getRoleByValue(value);
    return role;
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    type: RoleDto,
    isArray: true,
    example: [RoleExample],
  })
  async getAllRoles() {
    const users = await this.rolesService.getRoleAllRoles();
    return users;
  }
}
