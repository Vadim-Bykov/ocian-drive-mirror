import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './role.dto';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const createdRole = await this.roleModel.create(createRoleDto);
      return createdRole;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getRoleByValue(roleName: RoleEnum): Promise<Role | null> {
    try {
      const role = await this.roleModel.findOne({ value: roleName });
      if (!role) {
        throw new BadRequestException(`Role: ${roleName} was not found`);
      }

      return role;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getRoleAllRoles(): Promise<Role[]> {
    try {
      const roles = await this.roleModel.find().exec();
      return roles;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
