import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportLocalGuard } from './guards/passport-local.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { Resources } from '../roles/enums/resource.enum';
import { Actions } from '../roles/enums/actions.enum';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() req) {
    return this.authService.signIn(req.user);
  }

  // @Permissions([{resource: Resources.user, actions: [Actions.read]}])
  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() req) {
    return req.user;
  }

}
