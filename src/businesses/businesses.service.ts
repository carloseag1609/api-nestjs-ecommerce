import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { BusinessRepository } from './business.repository';
import { CreateBusinessDto } from './dto/create-business.dto';
import { GetBusinessesFilterDto } from './dto/get-businesses-filter.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';
import { CategoriesService } from './modules/categories/categories.service';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(BusinessRepository)
    private readonly businessRepository: BusinessRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    createBusinessDto: CreateBusinessDto,
    provider: Provider,
  ): Promise<Business> {
    const category = await this.categoriesService.findById(
      createBusinessDto.categoryId,
    );
    return await this.businessRepository.createBusiness(
      createBusinessDto,
      provider,
      category,
    );
  }

  getAllBusiness() {
    return this.businessRepository.find();
  }

  async getBusinessFiltered(getBusinessesFilter: GetBusinessesFilterDto) {
    const { category } = getBusinessesFilter;
    const foundCategory = await this.categoriesService.findByName(category);
    return this.businessRepository.getBusinessesByCategory(foundCategory);
  }

  findOne(id: string) {
    return this.businessRepository.getBusinessById(id);
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
