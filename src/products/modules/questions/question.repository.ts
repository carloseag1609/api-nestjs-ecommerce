import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Client } from 'src/auth/modules/clients/entities/client.entity';
import { Product } from 'src/products/entities/product.entity';
import { Answer } from '../answers/entities/answer.entity';
import { Question } from './entities/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async createQuestion(
    client: Client,
    product: Product,
    text: string,
  ): Promise<Question> {
    const question = await this.create({ client, product, text });
    await this.save(question);
    return question;
  }

  async addAnswer(question: Question, answer: Answer): Promise<Question> {
    question.answer = answer;
    await this.save(question);
    console.log(question);
    return question;
  }

  async getProductQuestions(productId: string): Promise<Question[]> {
    let questions = await this.find({
      where: {
        product: {
          id: productId,
        },
      },
    });
    questions = questions.map((question) => {
      delete question.client.user;
      delete question.client.address;
      return question;
    });
    return questions;
  }

  async getQuestionById(id: string): Promise<Question> {
    const question = await this.findOne(id, { relations: ['product'] });
    if (!question) {
      throw new NotFoundException(`Question not found`);
    }
    return question;
  }
}
