import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import {
  DeleteProductResult,
  GetProduct,
  GetProductShort,
  GetProductsSearch,
  PatchProductData,
  PatchProductResult,
  PostProductData,
  PostProductResult,
} from '@boilerplate/types/products/interfaces/products'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,

    private readonly productsDataMapper: ProductsDataMapper,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async getProductsList(queries: GetProductsSearch): Promise<HttpListServerResponse<GetProductShort>> {
    const { search, tagsIds } = queries

    const [products, total] = await this.productsRepository.findProductsAndCount({
      search,
      tagsIds,
    })

    return {
      result: products.map((product) => this.productsDataMapper.toGetProductShortResult(product)),
      total,
    }
  }

  async getProduct(id: string): Promise<HttpServerResponse<GetProduct>> {
    const product = await this.productsRepository.findOne({
      where: { id },
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
      result: this.productsDataMapper.toGetProductResult(product),
    }
  }

  async postProduct(data: PostProductData): Promise<HttpServerResponse<PostProductResult>> {
    const { imagesIds, tagsIds } = data

    const { id } = await this.productsRepository.save(this.productsDataMapper.fromPostProductData(data))

    await Promise.all([
      this.productsRepository.assignImages(id, imagesIds),
      this.productsRepository.assignTags(id, tagsIds),
    ])

    const result: PostProductResult = {
      isSuccess: true,
    }

    return { result }
  }

  async patchProduct(id: string, data: PatchProductData): Promise<HttpServerResponse<PatchProductResult>> {
    const { imagesIds, tagsIds } = data

    await this.productsRepository.update({ id }, this.productsDataMapper.fromPatchProductData(data))

    if (Array.isArray(imagesIds)) {
      await this.productsRepository.unassignImages(id, imagesIds)

      if (imagesIds.length > 0) {
        await this.productsRepository.assignImages(id, imagesIds)
      }
    }

    if (Array.isArray(tagsIds)) {
      await this.productsRepository.unassignTags(id, tagsIds)

      if (tagsIds.length > 0) {
        await this.productsRepository.assignTags(id, tagsIds)
      }
    }

    const result: PatchProductResult = {
      isSuccess: true,
    }

    return { result }
  }

  async deleteProduct(id: string): Promise<HttpServerResponse<DeleteProductResult>> {
    await this.productsRepository.softDelete({ id })

    const result: DeleteProductResult = {
      isSuccess: true,
    }

    return { result }
  }
}
