import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionsService } from 'src/addresses/modules/regions/regions.service';
import { Provider } from 'src/auth/modules/providers/entities/provider.entity';
import { ProviderRepository } from 'src/auth/modules/providers/provider.repository';
import { ProvidersService } from 'src/auth/modules/providers/providers.service';
import { Product } from 'src/products/entities/product.entity';
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
    @InjectRepository(ProviderRepository)
    private readonly providerRepository: ProviderRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    createBusinessDto: CreateBusinessDto,
    provider: Provider,
  ): Promise<Business> {
    const category = await this.categoriesService.findById(
      createBusinessDto.categoryId,
    );
    const business = await this.businessRepository.createBusiness(
      createBusinessDto,
      provider,
      category,
    );

    provider.business = business;

    await this.providerRepository.save(provider);

    return business;
  }

  getAllBusiness() {
    return this.businessRepository.find();
  }

  // async getBusinessFiltered(getBusinessesFilter: GetBusinessesFilterDto) {
  //   const { categoryId, regionId } = getBusinessesFilter;
  //   const category = await this.categoriesService.findByName(categoryId);
  //   const region = await this.regionsService.findOne(regionId);
  //   const businesses = [];
  //   // if (categoryId) {
  //   //   // businesses.push(
  //   //   //   );
  //   //   return await this.businessRepository.getBusinessesByCategory(category);
  //   // } else if (regionId) {
  //   //   // businesses.push(
  //   //   //   );
  //   //   return await this.businessRepository.getBusinessesByRegion(region);
  //   // }
  //   if (category && region) {
  //     return this.businessRepository.getBusinessByCategoryAndRegion(
  //       category,
  //       region,
  //     );
  //   }
  // }

  findOne(id: string) {
    return this.businessRepository.getBusinessById(id);
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }

  // addProduct(businessId: string, product: Product) {
  //   return this.businessRepository.addProduct(businessId, product);
  // }
}
