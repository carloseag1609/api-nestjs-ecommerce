import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/auth/user.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  validated: boolean;

  @Column({ default: false })
  cash: boolean;

  @Column({ default: false })
  card: boolean;

  @Column({ default: false })
  sellProducts: boolean;

  @Column({ default: false })
  offersServices: boolean;

  @Column({ nullable: true })
  validationImage: string;

  @OneToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Address, (address) => address.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  address: Address;
}
