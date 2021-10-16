import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: CreateUserDto): Promise<User> {
    const { email, password, phone, role } = authCredentialsDto;
    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ email, password: hashedPassword, phone, role });
    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(`Email or phone already in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateRole(id: string, role: Role) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    user.role = role;
    await this.save(user);
  }
}
