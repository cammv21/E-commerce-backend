import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';

type AuthInput = {
  email: string;
  password: string;
}

type SignInData = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type AuthResult = {
  user: SignInData;
  accessToken: string;
}

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private roleService: RolesService, // Assuming you have a RoleService for role management
    private readonly jwtService: JwtService, // Assuming you have a JwtService for token generation

  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findByEmail(input.email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.comparePassword(
      input.password,
      user.password,
    );

    if (isPasswordValid) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }
    // If the password is invalid
    return null;
  } 

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signIn(user);
  }
  
  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
    }

    const accessToken = this.jwtService.sign(tokenPayload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
    };
  }

  async getUserPermissions(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const permissions = await this.roleService.getById(user.roleId);
    if (!permissions) {
      throw new UnauthorizedException('Role not found');
    }

    return permissions.permissions.map((permission) => {
      return {
        resource: permission.resource,
        actions: permission.actions,
      };
    });

  }

  
}
