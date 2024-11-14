import { Injectable } from '@nestjs/common'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,

    private readonly productsDataMapper: ProductsDataMapper,
  ) {}
}
