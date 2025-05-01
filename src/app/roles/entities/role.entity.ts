import { Actions } from "../enums/actions.enum";
import { Resources } from "../enums/resource.enum";

export class Role {
    id: string;

    name: string;

    permissions: {
        resource: Resources;
        actions: Actions[];
    }[];

    updatedAt: Date;
    
    createdAt: Date;
}
