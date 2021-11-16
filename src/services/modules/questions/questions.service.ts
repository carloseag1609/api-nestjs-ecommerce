import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/auth/modules/clients/entities/client.entity';
import { ServiceRepository } from 'src/services/service.repository';
import { ServicesService } from 'src/services/services.service';
import { Answer } from '../answers/entities/answer.entity';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: QuestionRepository,
    @InjectRepository(ServiceRepository)
    private readonly serviceRepository: ServiceRepository,
    private readonly servicesService: ServicesService,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    let questions = await this.questionRepository.find();
    questions = questions.map((question: Question) => {
      delete question.client.user;
      delete question.client.address;
      return question;
    });
    return questions;
  }

  async getQuestionById(id: string): Promise<Question> {
    return await this.questionRepository.getQuestionById(id);
  }

  async getServiceQuestions(serviceId: string): Promise<Question[]> {
    return this.questionRepository.getServiceQuestions(serviceId);
  }

  async addAnswerToQuestion(
    question: Question,
    answer: Answer,
  ): Promise<Question> {
    return this.questionRepository.addAnswer(question, answer);
  }

  async createQuestion(
    serviceId: string,
    client: Client,
    text: string,
  ): Promise<Question> {
    const service = await this.serviceRepository.getServiceById(serviceId);
    delete service.provider;
    delete client.user;
    delete client.address;
    const question = await this.questionRepository.createQuestion(
      client,
      service,
      text,
    );
    service.questions.push(question);
    await this.serviceRepository.save(service);
    return question;
  }
}
