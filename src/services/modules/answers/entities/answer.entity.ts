import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity('service_answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Question, { onDelete: 'SET NULL' })
  @JoinColumn()
  question: Question;

  @Column()
  text: string;
}
