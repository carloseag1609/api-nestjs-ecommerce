import { Injectable } from '@nestjs/common';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { ProvidersService } from 'src/auth/modules/providers/providers.service';
import { BusinessesService } from 'src/businesses/businesses.service';
import { Business } from 'src/businesses/entities/business.entity';

@Injectable()
export class SearchService {
  constructor(
    private readonly businessesService: BusinessesService,
    private readonly providersService: ProvidersService,
  ) {}

  async getById(id: string) {
    const found = await this.businessesService.findOne(id);
  }
}
