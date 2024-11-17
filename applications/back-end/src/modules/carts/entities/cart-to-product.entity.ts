import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CartEntity } from '@boilerplate/back-end/modules/carts/entities/cart.entity'
import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Entity()
@Index(['cartId', 'productId'], { unique: true })
export class CartToProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid')
  cartId: string

  @Index()
  @Column('uuid')
  productId: string

  @Column({ default: 1 })
  quantity: number

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Index()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date

  @ManyToOne(() => CartEntity, (cart) => cart.toProducts)
  @JoinColumn({ name: 'cartId' })
  cart: CartEntity

  @ManyToOne(() => ProductEntity, (product) => product.toCarts)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity
}
