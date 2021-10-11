import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Region } from '../modules/regions/entities/region.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstAddress: string;

  @Column()
  secondAddress: string;

  @ManyToOne(() => Region, (region) => region.id, { eager: true })
  region: Region;
}
