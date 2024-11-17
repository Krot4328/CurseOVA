import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CurrencyType } from '@boilerplate/types/reference/interfaces/currency'

import { CartToProductEntity } from '@boilerplate/back-end/modules/carts/entities/cart-to-product.entity'
import { ProductToImageEntity } from '@boilerplate/back-end/modules/products/entities/product-to-image.entity'
import { ProductToTagEntity } from '@boilerplate/back-end/modules/products/entities/product-to-tag.entity'

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  description: string

  @Column()
  price: number

  @Column({ type: 'enum', enum: CurrencyType, default: CurrencyType.UAH })
  priceCurrency: CurrencyType

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Index()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date

  @OneToMany(() => CartToProductEntity, (cartToProduct) => cartToProduct.product)
  toCarts: CartToProductEntity[]

  @OneToMany(() => ProductToImageEntity, (productToImage) => productToImage.product)
  toImages: ProductToImageEntity[]

  @OneToMany(() => ProductToTagEntity, (productToTag) => productToTag.product)
  toTags: ProductToTagEntity[]
}
