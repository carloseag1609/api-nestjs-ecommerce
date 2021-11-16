import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Region } from 'src/addresses/modules/regions/entities/region.entity';

@Entity('product_shippings')
export class ProductShipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'SET NULL' })
  product: Product;

  @ManyToOne(() => Region, (region) => region.id, {
    eager: true,
  })
  region: Region;

  @Column()
  price: number;
}
