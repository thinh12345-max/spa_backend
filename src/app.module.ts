import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { UsersModule } from './module/users.module';
import { RolesModule } from './module/role.module';
import { ServicesModule } from './module/services.module';
import { AppointmentsModule } from './module/appointment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppointmentServicesModule } from './module/appointment_service.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // dev only
      entities: [__dirname + '/entity/*{.ts,.js}'],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    ServicesModule,
    AppointmentServicesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
