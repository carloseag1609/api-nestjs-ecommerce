import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
