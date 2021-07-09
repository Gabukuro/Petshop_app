import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { Pet } from "./entities/pet.entity";

@EntityRepository(Pet)
export class PetsRepository extends Repository<Pet> {
    async createPet(
        createPetDto: CreatePetDto
    ): Promise<Pet> {
        const {name, type, breed, gender, birthDate, observations, user} = createPetDto;

        let pet = this.create();
        pet.name = name;
        pet.type = type;
        pet.breed = breed;
        pet.gender = gender;
        pet.birthDate = birthDate;
        pet.observations = observations;
        pet.user = user;
        try {
            await pet.save();
            return pet;
        } catch(error) {
            throw new InternalServerErrorException("Error trying to create pet");
        }
    }

    async updatePet(
        id: string,
        updatePetDto: UpdatePetDto
    ): Promise<Pet> {
        const {name, type, breed, gender, birthDate, observations, user} = updatePetDto;

        let pet = await this.findOne(id);
        pet.name = name;
        pet.type = type;
        pet.breed = breed;
        pet.gender = gender;
        pet.birthDate = birthDate;
        pet.observations = observations;
        pet.user = user;
        try {
            await pet.save();
            return pet;
        } catch(error) {
            throw new InternalServerErrorException("Error trying to update pet");
        }
    }
}