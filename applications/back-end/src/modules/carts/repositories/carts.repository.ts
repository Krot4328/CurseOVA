import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm'

import { FindCartsAndCountOptions } from '@boilerplate/back-end/modules/carts/interfaces/repositories/carts'

import { CartToProductEntity } from '@boilerplate/back-end/modules/carts/entities/cart-to-product.entity'
import { CartEntity } from '@boilerplate/back-end/modules/carts/entities/cart.entity'

@Injectable()
export class CartsRepository extends Repository<CartEntity> {
  @InjectRepository(CartToProductEntity)
  private readonly cartToProductRepository: Repository<CartToProductEntity>

  constructor(readonly dataSource: DataSource) {
    super(CartEntity, dataSource.createEntityManager())
  }

  async findCartsAndCount({ page, pageSize }: FindCartsAndCountOptions = {}): Promise<
    [products: CartEntity[], total: number]
  > {
    const where: FindOptionsWhere<CartEntity> = {}

    const options: FindManyOptions<CartEntity> = {
      where,
      relations: {
        toProducts: {
          product: {
            toImages: {
              image: true,
            },
            toTags: {
              tag: true,
            },
          },
        },
      },
    }

    if (typeof pageSize === 'number') {
      options.take = pageSize

      if (typeof page === 'number') {
        options.skip = page * pageSize
      }
    }

    console.log({ options })

    return await this.findAndCount(options)
  }

  async findCartOneOrFail(id: string, userGid?: string | 'all'): Promise<CartEntity> {
    let where: FindOptionsWhere<CartEntity> | FindOptionsWhere<CartEntity>[] = [
      {
        id,
        userGid: IsNull(),
      },
      ...(userGid ? [{ id, userGid }] : []),
    ]

    if (userGid === 'all') {
      where = { id }
    }

    const cart = await this.findOne({
      where,
      relations: {
        toProducts: {
          product: {
            toImages: {
              image: true,
            },
            toTags: {
              tag: true,
            },
          },
        },
      },
      order: {
        toProducts: {
          createdAt: 'DESC',
        },
      },
    })

    if (!cart) {
      throw new NotFoundException('Cart not found')
    }

    if (userGid && !cart.userGid) {
      await this.update({ id }, { userGid })
    }

    return cart
  }

  async setProduct(id: string, productId: string, quantity?: number): Promise<void> {
    if (quantity === 0) {
      await this.cartToProductRepository.delete({ cartId: id, productId })

      return
    }

    let relation = await this.cartToProductRepository.findOne({
      where: { cartId: id, productId },
    })

    if (!relation) {
      relation = await this.cartToProductRepository.save({ cartId: id, productId })
    }

    if (quantity) {
      await this.cartToProductRepository.update({ cartId: id, productId }, { quantity })
    }
  }
}
