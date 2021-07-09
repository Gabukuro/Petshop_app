import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(
        createUserDto: CreateUserDto
    ): Promise<User> {
        const {name, email, password, role} = createUserDto;

        let user = this.create();
        user.role = role;
        user.name = name;
        user.email = email;
        user.password = password;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException("Error trying to create user");
        }
    }

    async updateUser(
        id: string,
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        const {name, email, password, role} = updateUserDto;

        let user = await this.findOne(id);
        user.role = role;
        user.name = name;
        user.email = email;
        user.password = password;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException("Error trying to update user");
        }
    }
}