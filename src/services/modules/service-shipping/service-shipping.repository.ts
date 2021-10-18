import { EntityRepository, Repository } from 'typeorm';
import { ServiceShipping } from './entities/service-shipping.entity';

@EntityRepository(ServiceShipping)
export class ServiceShippingRepository extends Repository<ServiceShipping> {}
