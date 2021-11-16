import { Client } from 'src/auth/modules/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../../answers/entities/answer.entity';

@Entity('product_questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  client: Client;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  product: Product;

  @OneToOne(() => Answer, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  answer: Answer;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
