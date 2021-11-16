import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { QuestionRepository } from '../questions/question.repository';
import { QuestionsService } from '../questions/questions.service';
import { AnswerRepository } from './answer.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerRepository)
    private readonly answerRepository: AnswerRepository,
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: QuestionRepository,
  ) {}

  async create(questionId: string, text: string, provider: Provider) {
    const question = await this.questionRepository.getQuestionById(questionId);
    if (question.product.provider.id !== provider.id) {
      throw new UnauthorizedException(`You can't answer this question`);
    } else {
      const answer = await this.answerRepository.createAnswer(question, text);
      const questionResult = await this.questionRepository.addAnswer(
        question,
        answer,
      );
      delete questionResult.product;
      delete questionResult.client;
      delete questionResult.answer.question;
      return questionResult;
    }
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
