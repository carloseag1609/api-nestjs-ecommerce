import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, phone, password } = authCredentialsDto;
    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ email, phone, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(`Email or phone already in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
