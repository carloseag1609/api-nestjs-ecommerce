import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Question } from 'src/services/modules/questions/entities/question.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServiceShipping } from '../modules/service-shipping/entities/service-shipping.entity';

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

  @ManyToMany(() => ServiceShipping, {
    eager: true,
  })
  @JoinTable()
  shippings: ServiceShipping[];

  @ManyToOne(() => Question, (question) => question.id, { eager: true })
  questions: Question[];
}
