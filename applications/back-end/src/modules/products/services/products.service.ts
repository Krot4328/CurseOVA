import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import {
  DeleteProductResult,
  GetProductData,
  PostProductData,
  PostProductResult,
  Tackle,
} from '@boilerplate/types/products/interfaces/products'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,

    private readonly productsDataMapper: ProductsDataMapper,
  ) {}

  async getProducts(data: GetProductData): Promise<HttpListServerResponse<GetProductData>> {
    const { title, price, description, tackle } = data

    const [produts, total] = await this.productsRepository.findAndCount()

    return {
      result: produts.map((product) => this.productsDataMapper.toProductData(product)),
      total,
    }
  }

  async postProduct(data: PostProductData): Promise<HttpServerResponse<PostProductResult>> {
    const { title, description, price, tackle, file } = data

    if (!Object.values(Tackle).includes(tackle)) {
      throw new Error(`Invalid tackle value: ${tackle}`)
    }

    await this.productsRepository.save({
      title,
      description,
      price: parseInt(`${price * 100}`, 10),
      tackle,
      pathToImage: `/uploads/tackles/${file.filename}`,
    })

    const result: PostProductResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }

  async deleteProduct(productId: string): Promise<HttpServerResponse<DeleteProductResult>> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    await this.productsRepository.delete(productId)

    const result: DeleteProductResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}
