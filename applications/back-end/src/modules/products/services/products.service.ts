import { Injectable } from '@nestjs/common'
import { FindOptionsWhere, ILike } from 'typeorm'

import { HttpListServerResponse } from '@boilerplate/core/interfaces/http'

import { GetProductShort, GetProductsSearch } from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,

    private readonly productsDataMapper: ProductsDataMapper,
  ) {}

  async getProductsList(queries: GetProductsSearch): Promise<HttpListServerResponse<GetProductShort>> {
    const { search, page, pageSize, tagsIds } = queries

    const where: FindOptionsWhere<ProductEntity> = {}

    if (typeof search === 'string' && search.length > 0) {
      where.title = ILike(`%${search.split('').join('%')}%`)
    }

    const [products, total] = await this.productsRepository.findAndCount({
      where,
      relations: {
        toImages: {
          image: true,
        },
        toTags: {
          tag: true,
        },
      },
    })

    return {
      result: products.map((product) => this.productsDataMapper.toProductShort(product)),
      total,
    }
  }
}
