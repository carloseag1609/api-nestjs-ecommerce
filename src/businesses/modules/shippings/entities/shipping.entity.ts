import { Region } from 'src/addresses/modules/regions/entities/region.entity';
import { Business } from 'src/businesses/entities/business.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shippings')
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Business, (business) => business.shippings)
  business: Business;

  @ManyToOne(() => Region, (region) => region.shippings, { eager: true })
  region: Region;

  @Column()
  price: number;
}
