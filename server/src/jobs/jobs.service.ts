import { Injectable } from '@nestjs/common';
import { ServicesRepository } from 'src/services/services.repository';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {

  constructor(
    private jobsRepository: JobsRepository,
    private servicesRepository: ServicesRepository
    ) {}

  async create(createJobDto: CreateJobDto) {

    let { services } = createJobDto;

    createJobDto.services = await this.servicesRepository.findByIds(services);

    return this.jobsRepository.createJob(createJobDto);
  }

  findAll() {
    return this.jobsRepository.find({
      relations: ["pet", "user", "services"]
    });
  }

  findOne(id: string) {
    return this.jobsRepository.findOneOrFail(id);
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobsRepository.updateJob(id, updateJobDto);
  }

  remove(id: string) {
    return this.jobsRepository.delete(id);
  }
}
