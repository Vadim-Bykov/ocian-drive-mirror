import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './role.dto';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = await this.roleModel.create(createRoleDto);
    return createdRole;
  }

  async getRoleByValue(role: RoleEnum): Promise<Role | null> {
    const roleName = await this.roleModel.findById({ value: role });
    return roleName;
  }

  async getRoleAllRoles(): Promise<Role[]> {
    const roles = await this.roleModel.find().exec();
    return roles;
  }
}
