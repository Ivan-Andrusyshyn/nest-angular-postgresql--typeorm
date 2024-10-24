import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AccessEnum, User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AccessToken } from './types/access-token.type';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { LoginResponseDTO } from './dto/loginResponse.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    if (user.id == null || isNaN(user.id)) {
      throw new BadRequestException('Invalid user ID');
    }

    return user;
  }

  async login(user: LoginResponseDTO): Promise<AccessToken> {
    const response = await this.userService.findOneByEmail(user.email);

    if (!response) {
      throw new BadRequestException('User is not exist.');
    }

    return this.createAccessToken(response);
  }

  async register(registerRequest: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(
      registerRequest.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
    const newUser: Partial<User> = {
      ...registerRequest,
      password: hashedPassword,
      access: AccessEnum.Guest,
      posts: [],
    };

    const savedUser = await this.userService.create(newUser as User);

    return this.createAccessToken(savedUser);
  }

  private createAccessToken(user: User) {
    const payload = { id: user.id, email: user.email, name: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }
}
