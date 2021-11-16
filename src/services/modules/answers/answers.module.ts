import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerRepository } from './answer.repository';
import { QuestionRepository } from '../questions/question.repository';
import { QuestionsModule } from 'src/products/modules/questions/questions.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    TypeOrmModule.forFeature([AnswerRepository, QuestionRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    QuestionsModule,
  ],
  exports: [AnswersModule, AnswersService],
})
export class AnswersModule {}
