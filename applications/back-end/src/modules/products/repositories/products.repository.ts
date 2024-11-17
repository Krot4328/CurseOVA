import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, FindManyOptions, FindOptionsWhere, ILike, In, Repository } from 'typeorm'

import { FindProductsAndCountOptions } from '@boilerplate/back-end/modules/products/interfaces/repositories/products'

import { ProductToImageEntity } from '@boilerplate/back-end/modules/products/entities/product-to-image.entity'
import { ProductToTagEntity } from '@boilerplate/back-end/modules/products/entities/product-to-tag.entity'
import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Injectable()
export class ProductsRepository extends Repository<ProductEntity> {
  @InjectRepository(ProductToImageEntity)
  private readonly productToImageRepository: Repository<ProductToImageEntity>

  @InjectRepository(ProductToTagEntity)
  private readonly productToTagRepository: Repository<ProductToTagEntity>

  constructor(readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager())
  }

  async findProductsAndCount({ search, page, pageSize /* , tagsIds */ }: FindProductsAndCountOptions = {}): Promise<
    [products: ProductEntity[], total: number]
  > {
    const where: FindOptionsWhere<ProductEntity> = {}

    if (typeof search === 'string' && search.length > 0) {
      where.title = ILike(`%${search.split('').join('%')}%`)
    }

    const options: FindManyOptions<ProductEntity> = {
      where,
      relations: {
        toImages: {
          image: true,
        },
        toTags: {
          tag: true,
        },
      },
    }

    if (typeof pageSize === 'number') {
      options.take = pageSize

      if (typeof page === 'number') {
        options.take = page * pageSize
      }
    }

    return await this.findAndCount(options)
  }

  async assignImages(id: string, imagesIds: string[]): Promise<void> {
    await this.productToImageRepository.upsert(
      imagesIds.map((imageId) => ({ productId: id, imageId })),
      ['productId', 'imageId'],
    )
  }

  async unassignImages(id: string, imagesIds?: string[]): Promise<void> {
    const where: FindOptionsWhere<ProductToImageEntity> = { id }

    if (Array.isArray(imagesIds) && imagesIds.length > 0) {
      where.imageId = In(imagesIds)
    }

    await this.productToImageRepository.delete(where)
  }

  async assignTags(id: string, tagsIds: string[]): Promise<void> {
    await this.productToTagRepository.upsert(
      tagsIds.map((tagId) => ({ productId: id, tagId })),
      ['productId', 'tagId'],
    )
  }

  async unassignTags(id: string, tagsIds?: string[]): Promise<void> {
    const where: FindOptionsWhere<ProductToTagEntity> = { id }

    if (Array.isArray(tagsIds) && tagsIds.length > 0) {
      where.tagId = In(tagsIds)
    }

    await this.productToTagRepository.delete(where)
  }
}
