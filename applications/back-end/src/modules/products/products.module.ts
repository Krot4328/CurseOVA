import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'
import { FilesModule } from '@boilerplate/back-end/modules/files/files.module'
import { ReferenceModule } from '@boilerplate/back-end/modules/reference/reference.module'

import { ProductToImageEntity } from '@boilerplate/back-end/modules/products/entities/product-to-image.entity'
import { ProductToTagEntity } from '@boilerplate/back-end/modules/products/entities/product-to-tag.entity'
import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsController } from '@boilerplate/back-end/modules/products/controllers/products.controller'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductToImageEntity, //
      ProductToTagEntity, //
      ProductEntity, //
    ]),
    FilesModule, //
    ReferenceModule, //
    forwardRef(() => AuthModule), //
  ],
  controllers: [
    ProductsController, //
  ],
  providers: [
    ProductsRepository, //
    ProductsService, //
    ProductsDataMapper, //
  ],
  exports: [
    ProductsRepository, //
    ProductsService, //
    ProductsDataMapper, //
  ],
})
export class ProductsModule {}
