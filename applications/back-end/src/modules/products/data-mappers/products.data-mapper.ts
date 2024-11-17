import { Injectable } from '@nestjs/common'

import {
  GetProduct,
  GetProductShort,
  PatchProductData,
  PostProductData,
} from '@boilerplate/types/products/interfaces/products'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { FilesDataMapper } from '@boilerplate/back-end/modules/files/data-mappers/files.data-mapper'
import { ReferenceDataMapper } from '@boilerplate/back-end/modules/reference/data-mappers/reference.data-mapper'

@Injectable()
export class ProductsDataMapper {
  constructor(
    private readonly filesDataMapper: FilesDataMapper,
    private readonly referenceDataMapper: ReferenceDataMapper,
  ) {}

  toGetProductShortResult(entity: ProductEntity): GetProductShort {
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

  toGetProductResult(entity: ProductEntity): GetProduct {
    const { description } = entity

    return {
      ...this.toGetProductShortResult(entity),
      description,
    }
  }

  fromPostProductData(data: PostProductData): Partial<ProductEntity> {
    const { title, description, price } = data
    const { value, currency } = price

    return {
      title,
      description,
      price: value,
      priceCurrency: currency,
    }
  }

  fromPatchProductData(data: PatchProductData): Partial<ProductEntity> {
    const { title, description, price } = data
    const { value, currency } = price ?? {}

    const result: Partial<ProductEntity> = {}

    if (typeof title === 'string') {
      result.title = title
    }

    if (typeof description === 'string') {
      result.description = description
    }

    if (typeof price !== 'undefined') {
      result.price = value
      result.priceCurrency = currency
    }

    return result
  }
}
