import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsRepository } from './jobs.repository';
import { ServicesRepository } from 'src/services/services.repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobsRepository, ServicesRepository])],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
