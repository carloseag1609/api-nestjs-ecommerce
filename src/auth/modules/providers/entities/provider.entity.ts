import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/auth/entities/user.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ default: true })
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

  @OneToOne(() => Business)
  @JoinColumn()
  business: Business;
}
