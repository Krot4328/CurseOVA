import { Injectable } from '@nestjs/common'

import { CartItem, GetCart, GetCartInfo } from '@boilerplate/types/carts/interfaces/carts'

import { CartToProductEntity } from '@boilerplate/back-end/modules/carts/entities/cart-to-product.entity'
import { CartEntity } from '@boilerplate/back-end/modules/carts/entities/cart.entity'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class CartsDataMapper {
  constructor(private readonly productsDataMapper: ProductsDataMapper) { }

  toCartItem(entity: CartToProductEntity): CartItem {
    const { product, quantity } = entity

    return {
      product: this.productsDataMapper.toGetProductShortResult(product),
      quantity,
    }
  }

  toCart(entity: CartEntity): GetCart {
    const { id, userGid, firstName, lastName, phone, email, city, department, paymentStatus, toProducts } = entity

    return {
      id,
      profileId: userGid,
      firstName,
      lastName,
      phone,
      email,
      city,
      department,
      paymentStatus,
      items: toProducts.map((toProduct) => this.toCartItem(toProduct)),
    }
  }

  toCartInfo(entity: CartEntity): GetCartInfo {
    const { toProducts, userGid, firstName, lastName, phone, email, id, updatedAt } = entity

    return {
      id,
      items: toProducts?.map((toProduct) => this.toCartItem(toProduct)),
      profileId: userGid,
      firstName,
      lastName,
      phone,
      email,
      updatedAt: updatedAt?.toISOString(),
    }
  }
}
