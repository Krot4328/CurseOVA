import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'
import { ProductsModule } from '@boilerplate/back-end/modules/products/products.module'

import { CartToProductEntity } from '@boilerplate/back-end/modules/carts/entities/cart-to-product.entity'
import { CartEntity } from '@boilerplate/back-end/modules/carts/entities/cart.entity'

import { CartsRepository } from '@boilerplate/back-end/modules/carts/repositories/carts.repository'

import { CartsController } from '@boilerplate/back-end/modules/carts/controllers/carts.controller'

import { CartsService } from '@boilerplate/back-end/modules/carts/services/carts.service'

import { CartsDataMapper } from '@boilerplate/back-end/modules/carts/data-mappers/carts.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartToProductEntity, //
      CartEntity, //
    ]),
    ProductsModule, //
    forwardRef(() => AuthModule), //
  ],
  controllers: [
    CartsController, //
  ],
  providers: [
    CartsRepository, //
    CartsService, //
    CartsDataMapper, //
  ],
  exports: [
    CartsRepository, //
    CartsService, //
    CartsDataMapper, //
  ],
})
export class CartsModule {}
