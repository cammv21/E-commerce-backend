import { ArrayUnique, IsEnum, IsString, Validate, ValidateNested } from "class-validator";
import { Actions } from "../enums/actions.enum";
import { Resources } from "../enums/resource.enum";
import { Type } from "class-transformer";

export class CreateRoleDto {
    @IsString()
    name: string;

    @ValidateNested()
    @Type(() => Permission)
    permissions: Permission[];

}

export class Permission {
    @IsEnum(Resources)
    resource: Resources;

    @IsEnum(Actions, { each: true })
    @ArrayUnique()
    actions: Actions[];

}

