import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./entities/role.entity";


export const ROLE_REPOSITORY = "RoleRepository";

export interface RoleRepository {
    findAll(): Promise<Role[]>;
    getById(id: string): Promise<Role>;
    createRole(role: CreateRoleDto): Promise<Role>;

}