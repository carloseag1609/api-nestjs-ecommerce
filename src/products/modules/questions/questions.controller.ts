import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Client } from 'src/auth/modules/clients/entities/client.entity';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Roles } from 'src/auth/roles.decorator';
import { AnswersService } from '../answers/answers.service';
import { CreateAnswerDto } from '../answers/dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@Controller('products/questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly answersService: AnswersService,
  ) {}

  @Roles(Role.CLIENT, Role.ADMIN, Role.PROVIDER)
  @UseGuards(AuthGuard(), new RoleGuard())
  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @Roles(Role.PROVIDER)
  @UseGuards(AuthGuard(), new RoleGuard())
  @Post('/:questionId/answer')
  answerProductQuestion(
    @Param('questionId') questionId: string,
    @Body() createAnswerDto: CreateAnswerDto,
    @GetUser() provider: Provider,
  ) {
    const { text } = createAnswerDto;
    return this.answersService.create(questionId, text, provider);
  }

  @Roles(Role.CLIENT, Role.ADMIN, Role.PROVIDER)
  @UseGuards(AuthGuard())
  @Get('/:productId')
  getProductQuestion(@Param('productId') productId: string) {
    return this.questionsService.getProductQuestions(productId);
  }

  @Roles(Role.CLIENT)
  @UseGuards(AuthGuard(), new RoleGuard())
  @Post('/:productId')
  askProductQuestion(
    @Param('productId') productId: string,
    @Body() createQuestionDto: CreateQuestionDto,
    @GetUser() client: Client,
  ) {
    const { text } = createQuestionDto;
    return this.questionsService.createQuestion(productId, client, text);
  }
}
