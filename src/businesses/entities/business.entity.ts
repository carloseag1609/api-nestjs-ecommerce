import { Address } from 'src/addresses/entities/address.entity';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Product } from 'src/products/entities/product.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../modules/categories/entities/category.entity';
import { Shipping } from '../modules/shippings/entities/shipping.entity';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Provider, { eager: true })
  @JoinColumn()
  provider: Provider;

  @ManyToOne(() => Category, (category) => category.id, {
    eager: true,
  })
  category: Category;

  @OneToMany(() => Shipping, (shipping) => shipping.business, { eager: true })
  shippings: Shipping[];

  @Column()
  envioColima: string;

  @Column()
  envioVdeA: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  logo: string;
}
