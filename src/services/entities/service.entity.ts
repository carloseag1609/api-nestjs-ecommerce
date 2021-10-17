import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column()
  price: number;

  @Column({ default: true })
  visible: boolean;

  @ManyToOne(() => Provider, (provider) => provider.id, { eager: true })
  provider: Provider;
}
