import { SetMetadata } from "@nestjs/common";
import { Permission } from "../roles/dto/create-role.dto";


export const Permissions = (permissions: Permission[]) => 
    SetMetadata("permissions", permissions); 