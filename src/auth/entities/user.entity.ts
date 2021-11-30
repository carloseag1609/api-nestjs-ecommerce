import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: Role;

  @Column({
    default:
      'http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
  })
  photo: string;
}
