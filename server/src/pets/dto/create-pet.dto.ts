import { User } from "src/users/entities/user.entity";

export class CreatePetDto {
    name: string;
    type: string;
    breed: string;
    birthDate: Date;
    gender: string;
    observations: string;
    user: User;
}
