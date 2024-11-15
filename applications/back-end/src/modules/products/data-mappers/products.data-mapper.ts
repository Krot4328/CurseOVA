import { Injectable } from '@nestjs/common'

import { GetProductShort } from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { FilesDataMapper } from '@boilerplate/back-end/modules/files/data-mappers/files.data-mapper'
import { ReferenceDataMapper } from '@boilerplate/back-end/modules/reference/data-mappers/reference.data-mapper'

@Injectable()
export class ProductsDataMapper {
  constructor(
    private readonly filesDataMapper: FilesDataMapper,
    private readonly referenceDataMapper: ReferenceDataMapper,
  ) {}

  toProductShort(entity: ProductEntity): GetProductShort {
    const { id, title, price, priceCurrency, toImages, toTags } = entity

    return {
      id,
      title,
      price: {
        value: price,
        currency: priceCurrency,
      },
      images: toImages.map(({ image }) => this.filesDataMapper.toImage(image)),
      tags: toTags.map(({ tag }) => this.referenceDataMapper.toTag(tag)),
    }
  }
}
