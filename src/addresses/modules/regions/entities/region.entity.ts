import { Shipping } from 'src/businesses/modules/shippings/entities/shipping.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('regions')
export class Region {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Shipping, (shipping) => shipping.region)
  shippings: Shipping[];
}
