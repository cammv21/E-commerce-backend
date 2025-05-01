import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./entities/role.entity";
import { RoleRepository } from "./roles.repository";
import { RoleDocument, RoleModel } from "./schemas/role.schema";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleMongoRepository implements RoleRepository {
    constructor(@InjectModel(Role.name) private readonly roleModel: RoleModel) {}

    async findAll(): Promise<Role[]> {
        const roles = await this.roleModel.find().exec();
        return roles.map((role) => this.mapToRole(role));
    }

    async getById(id: string): Promise<Role> {
        const role = await this.roleModel
            .findById(id)
            .exec();  
        
        if (!role) {
            return null;
        }
        return this.mapToRole(role);
    }

    async createRole(role: CreateRoleDto): Promise<Role> {
        const roleCreated = await new this.roleModel(role).save();
        return await this.mapToRole(roleCreated);
    }
    
    private mapToRole(rawUser: RoleDocument): Role {
            const role = new Role();

            role.id = rawUser.id;
            role.name = rawUser.name;
            role.permissions = rawUser.permissions;
            role.createdAt = rawUser.createdAt;
            role.updatedAt = rawUser.updatedAt;

            return role;
        }
    
}