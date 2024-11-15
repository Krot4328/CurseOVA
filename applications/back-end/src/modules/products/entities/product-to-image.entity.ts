import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { FileEntity } from '@boilerplate/back-end/modules/files/entities/file.entity'
import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Entity()
@Index(['productId', 'imageId'], { unique: true })
export class ProductToImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid')
  productId: string

  @Index()
  @Column('uuid')
  imageId: string

  @ManyToOne(() => ProductEntity, (product) => product.toImages)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity

  @ManyToOne(() => FileEntity, (image) => image.toProducts)
  @JoinColumn({ name: 'imageId' })
  image: FileEntity
}
