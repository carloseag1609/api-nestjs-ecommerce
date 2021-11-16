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
import { Question } from '../modules/questions/entities/question.entity';

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

  @ManyToOne(() => Provider, (provider) => provider.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  provider: Provider;

  @ManyToMany(() => ProductShipping, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  shippings: ProductShipping[];

  @OneToMany(() => Question, (question) => question.product, {
    eager: true,
    onDelete: 'CASCADE',
  })
  questions: Question[];
}
