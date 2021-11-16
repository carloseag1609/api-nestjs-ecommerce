import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/auth/modules/clients/entities/client.entity';
import { ProductRepository } from 'src/products/product.repository';
import { ProductsService } from 'src/products/products.service';
import { Answer } from '../answers/entities/answer.entity';
import { Question } from './entities/question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly questionRepository: QuestionRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly productsService: ProductsService,
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

  async getProductQuestions(productId: string): Promise<Question[]> {
    return this.questionRepository.getProductQuestions(productId);
  }

  async addAnswerToQuestion(
    question: Question,
    answer: Answer,
  ): Promise<Question> {
    return this.questionRepository.addAnswer(question, answer);
  }

  async createQuestion(
    productId: string,
    client: Client,
    text: string,
  ): Promise<Question> {
    const product = await this.productsService.getById(productId);
    delete product.provider;
    delete client.user;
    delete client.address;
    const question = await this.questionRepository.createQuestion(
      client,
      product,
      text,
    );
    // console.log(product);
    // if (product.questions) {
    //   product.questions = [...product.questions, question];
    // } else {
    //   product.questions = [question];
    // }
    // product.questions.push(question);
    console.log(product);
    await this.productRepository.save(product);
    return question;
  }
}
