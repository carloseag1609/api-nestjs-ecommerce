import { Client } from 'src/auth/modules/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
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

@Entity('service_questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.id, {
    eager: true,
  })
  client: Client;

  @ManyToOne(() => Service, (service) => service.id)
  service: Service;

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
