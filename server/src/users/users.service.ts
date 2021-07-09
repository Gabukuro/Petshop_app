import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.createUser(createUserDto);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findAllClients() {
    return this.usersRepository.find({
      where: {role: "CLIENT"},
      relations: ["pets"],
    });
  }

  findOne(id: string) {
    return this.usersRepository.findOneOrFail(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
