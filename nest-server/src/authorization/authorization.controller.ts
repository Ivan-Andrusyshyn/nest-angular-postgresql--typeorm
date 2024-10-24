import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { AuthorizationService } from './authorization.service';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { AccessToken } from './types/access-token.type';
import { LoginResponseDTO } from './dto/loginResponse.dto';

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authService: AuthorizationService) {}

  @Post('login')
  async login(
    @Body() user: LoginResponseDTO,
  ): Promise<AccessToken | BadRequestException> {
    console.log(user);

    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
  ): Promise<AccessToken | BadRequestException> {
    return this.authService.register(registerBody);
  }
}
