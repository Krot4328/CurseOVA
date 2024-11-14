import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

import { ProductsRepository } from '@boilerplate/back-end/modules/products/repositories/products.repository'

import { ProductsController } from '@boilerplate/back-end/modules/products/controllers/products.controller'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

import { ProductsDataMapper } from '@boilerplate/back-end/modules/products/data-mappers/products.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => AuthModule)],
  controllers: [ProductsController],
  providers: [ProductsRepository, ProductsService, ProductsDataMapper],
  exports: [ProductsRepository, ProductsService, ProductsDataMapper],
})
export class ProductsModule {}
