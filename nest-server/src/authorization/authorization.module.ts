import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User]), ...jwtConfig],
  controllers: [AuthorizationController],
  providers: [AuthorizationService, UserService, ConfigService, JwtStrategy],
})
export class AuthorizationModule {}
