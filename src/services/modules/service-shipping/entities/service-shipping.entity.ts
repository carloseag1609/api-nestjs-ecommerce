import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Service } from 'src/services/entities/service.entity';

@Entity('product_shippings')
export class ServiceShipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Service, (service) => service.id)
  service: Service;

  @ManyToOne(() => Region, (region) => region.id, { eager: true })
  region: Region;

  @Column()
  price: number;
}
