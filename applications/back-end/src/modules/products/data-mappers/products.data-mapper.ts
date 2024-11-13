import { Injectable } from '@nestjs/common'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'
import { GetProductData } from '@boilerplate/types/products/interfaces/products'

@Injectable()
export class ProductsDataMapper {
  toProductData(entity: ProductEntity): GetProductData {
    const { id, title, description, price, tackle, pathToImage } = entity

    return {
      id,
      title,
      description,
      price: price / 100,
      tackle,
      pathToImage,
    }
  }
}
