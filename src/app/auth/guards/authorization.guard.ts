import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY } from "src/app/decorators/permissions.decorator";
import { AuthService } from "../auth.service";
import { Permission } from "src/app/roles/dto/create-role.dto";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector, // Inject the Reflector to access metadata
        private readonly authService: AuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId; 
        console.log("AuthorizationGuard: ",userId ); // Log the userId for debugging

        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }

        const requiredPermissions: Permission[] = this.reflector.getAllAndOverride(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        console.log("requiredPermissions: ", requiredPermissions); // Log the required permissions for debugging

        try {
            const userPermissions = await this.authService.getUserPermissions(userId); // Fetch user permissions from the service
            console.log("userPermissions: ", userPermissions); 
            // Log the user permissions for debugging
            for (const permission of requiredPermissions) {
                const userPermission = userPermissions.find( 
                    (perm) => perm.resource === permission.resource 
                );
                
                if (!userPermission) {
                    throw new ForbiddenException(`User does not have permission for resource: ${permission.resource}`);
                }

                const allActionsAvailable = userPermission.actions.every(
                    action => permission.actions.includes(action),
                );

                if (!allActionsAvailable) {
                    throw new ForbiddenException(`User does not have permission for actions: ${permission.actions}`);
                }

            }
            return true; // User has the required permissions

        } catch (error) {
            
        }
    }
}
