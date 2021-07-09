import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsRepository } from './pets.repository';

@Injectable()
export class PetsService {
  
  constructor(private petsRepository: PetsRepository) {}

  async create(createPetDto: CreatePetDto) {
    return this.petsRepository.createPet(createPetDto);
  }

  findAll() {
    return this.petsRepository.find();
  }

  findOne(id: string) {
    return this.petsRepository.findOneOrFail(id);
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    return this.petsRepository.updatePet(id, updatePetDto);
  }

  remove(id: string) {
    return this.petsRepository.delete(id)
  }
}
