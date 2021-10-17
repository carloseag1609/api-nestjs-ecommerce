import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { Roles } from 'src/auth/roles.decorator';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { GetBusinessesFilterDto } from './dto/get-businesses-filter.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@UseGuards(AuthGuard(), new RoleGuard())
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Roles(Role.PROVIDER)
  @Post()
  create(
    @Body() createBusinessDto: CreateBusinessDto,
    @GetUser() provider: Provider,
  ) {
    return this.businessesService.create(createBusinessDto, provider);
  }

  @Get()
  findAll() {
    return this.businessesService.getAllBusiness();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessesService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessesService.remove(+id);
  }
}
