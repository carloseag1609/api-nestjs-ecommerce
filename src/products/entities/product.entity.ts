import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductShipping } from '../modules/products-shipping/entities/product-shipping.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  stock: number;

  @Column({ default: true })
  visible: boolean;

  @Column()
  price: number;

  @ManyToOne(() => Provider, (provider) => provider.id, { eager: true })
  provider: Provider;

  @ManyToMany(() => ProductShipping, {
    eager: true,
  })
  @JoinTable()
  shippings: ProductShipping[];
}
