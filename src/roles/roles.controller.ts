import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRoleDto, RoleDto } from './role.dto';
import { RoleEnum } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { RolesService } from './roles.service';

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

  @ApiOperation({
    summary: 'Get role',
    parameters: [{ name: 'role', in: 'path' }],
  })
  @ApiResponse({
    status: 200,
    type: RoleDto,
    example: RoleExample,
  })
  @Get(':role')
  async getRoleByValue(
    @Param(
      'role',
      new ParseEnumPipe(RoleEnum, {
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    roleName: RoleEnum,
  ) {
    const role = await this.rolesService.getRoleByValue(roleName);
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
