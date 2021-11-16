import { forwardRef, Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from './question.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ProductsModule } from 'src/products/products.module';
import { AnswersModule } from '../answers/answers.module';
import { ProductRepository } from 'src/products/product.repository';
import { AnswerRepository } from 'src/products/modules/answers/answer.repository';
import { ServiceRepository } from 'src/services/service.repository';
import { ServicesModule } from 'src/services/services.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    TypeOrmModule.forFeature([
      QuestionRepository,
      ProductRepository,
      ServiceRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => ProductsModule),
    AuthModule,
    AnswersModule,
    forwardRef(() => ServicesModule),
  ],
  exports: [QuestionsModule, QuestionsService],
})
export class QuestionsModule {}
