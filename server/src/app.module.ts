import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/db/typeorm.config';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ServicesModule } from './services/services.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    PetsModule,
    ServicesModule,
    JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
