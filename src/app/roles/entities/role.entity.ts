export class Role {
    id: string;
    
    name: string;

    permissions: {
        resource: string;
        description: string;
    }[];

    updatedAt: Date;
    
    createdAt: Date;
}
