import { Pet } from "src/pets/entities/pet.entity";
import { Service } from "src/services/entities/service.entity";
import { User } from "src/users/entities/user.entity";
import { Double } from "typeorm";

export class CreateJobDto {
    notes: string;
    totalPrice: number;
    user: User;
    pet: Pet;
    scheduleTo: Date;
    services: any
}
