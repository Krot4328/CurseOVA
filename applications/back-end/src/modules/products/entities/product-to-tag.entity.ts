import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'
import { TagEntity } from '@boilerplate/back-end/modules/reference/entities/tag.entity'

@Entity()
@Index(['productId', 'tagId'], { unique: true })
export class ProductToTagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid')
  productId: string

  @Index()
  @Column('uuid')
  tagId: string

  @ManyToOne(() => ProductEntity, (product) => product.toTags)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity

  @ManyToOne(() => TagEntity, (tag) => tag.toProducts)
  @JoinColumn({ name: 'tagId' })
  tag: TagEntity
}
