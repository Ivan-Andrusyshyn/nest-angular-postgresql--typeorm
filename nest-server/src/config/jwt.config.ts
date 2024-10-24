import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig = [
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_KEY'),
      signOptions: {
        expiresIn: parseInt(
          configService.getOrThrow<string>('ACCESS_TOKEN_DURATION_IN_SEC'),
        ),
      },
    }),
  }),
];
