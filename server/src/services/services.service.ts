import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from './services.repository';

@Injectable()
export class ServicesService {

  constructor(private servicesRepository: ServicesRepository) {};

  create(createServiceDto: CreateServiceDto) {
    return this.servicesRepository.createService(createServiceDto);
  }

  findAll() {
    return this.servicesRepository.find();
  }

  findOne(id: string) {
    return this.servicesRepository.findOne(id);
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.servicesRepository.updateService(id, updateServiceDto);
  }

  remove(id: string) {
    return this.servicesRepository.delete(id);
  }
}
