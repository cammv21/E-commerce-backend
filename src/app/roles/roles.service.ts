import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { ROLE_REPOSITORY, RoleRepository } from './roles.repository';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: RoleRepository,
  ) {}

  async findAll() {
    return await this.roleRepository.findAll();
  }

  async getById(id: string) {
    return await this.roleRepository.getById(id);
  }

  async createRole(role: CreateRoleDto) {
    return await this.roleRepository.createRole(role);
  }

}
