import { EntityRepository, Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Answer } from './entities/answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  async createAnswer(question: Question, text: string): Promise<Answer> {
    const answer = await this.create({ question, text });
    await this.save(answer);
    return answer;
  }
}
