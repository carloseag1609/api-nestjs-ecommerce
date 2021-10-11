import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Role } from 'src/auth/enums/role.enum';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  validationImage: string;

  @Column()
  validated: boolean;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Address, (address) => address.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  address: Address;

  @AfterInsert()
  updateUserRole() {
    this.user.role = Role.CLIENT;
  }
}
