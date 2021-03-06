import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      nome: 'Enzo de Carvalho Santos',
      email: 'enzocsantos18@gmail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const id = this.users[this.users.length - 1]?.id + 1 || 1;

    const user: User = {
      id,
      ...createUserDto,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user: User = this.users.find((user) => user.id === +id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    const index = this.users.indexOf(user);

    const newUser = {
      ...user,
      ...updateUserDto,
    };

    this.users[index] = newUser;

    return newUser;
  }

  remove(id: number) {
    const user = this.findOne(id);

    const index = this.users.indexOf(user);

    this.users.slice(index, 1);
  }
}
