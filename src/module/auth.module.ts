import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UsersModule } from '../module/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/users';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,  
    AuthModule,
    ConfigModule,        
    JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.getOrThrow('JWT_SECRET'),
    signOptions: { expiresIn: '1d' },
  }),
}),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}