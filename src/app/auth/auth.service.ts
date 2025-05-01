import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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

  
}
