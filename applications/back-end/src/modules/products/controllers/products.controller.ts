import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  DeleteProductUrl,
  GetProductUrl,
  GetProductsListUrl,
  GetProductsSearchDto,
  PatchProductDataDto,
  PatchProductUrl,
  PostProductDataDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import {
  DeleteProductResultHttpResponseDto,
  GetProductHttpResponseDto,
  GetProductsHttpListResponseDto,
  PatchProductResultHttpResponseDto,
  PostProductResultHttpResponseDto,
} from '@boilerplate/types/products/dto/responses/products'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

@Controller()
@ApiTags('Products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name)

  // eslint-disable-next-line prettier/prettier
  constructor(private readonly productsService: ProductsService) { }

  @Get(GetProductsListUrl)
  async getProductsList(@Query() queries: GetProductsSearchDto): Promise<GetProductsHttpListResponseDto> {
    const { search, tagsIds } = queries

    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.getProductsList`,
      queries: {
        search,
        tagsIds,
      },
    })

    return await this.productsService.getProductsList({ search, tagsIds })
  }

  @Get(GetProductUrl)
  async getProduct(@Param('productId') productId: string): Promise<GetProductHttpResponseDto> {
    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.getProduct`,
      params: {
        productId,
      },
    })

    return await this.productsService.getProduct(productId)
  }

  @Post(PostProductUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async postProduct(@Body() body: PostProductDataDto): Promise<PostProductResultHttpResponseDto> {
    const { title, description, price, tagsIds, imagesIds } = body

    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.postProduct`,
      data: {
        title,
        description,
        price,
        tagsIds,
        imagesIds,
      },
    })

    return await this.productsService.postProduct({ title, description, price, tagsIds, imagesIds })
  }

  @Patch(PatchProductUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async patchProduct(
    @Param('productId') productId: string,
    @Body() body: PatchProductDataDto,
  ): Promise<PatchProductResultHttpResponseDto> {
    const { title, description, price, tagsIds, imagesIds } = body

    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.patchProduct`,
      params: {
        productId,
      },
      data: { title, description, price, tagsIds, imagesIds },
    })

    return await this.productsService.patchProduct(productId, { title, description, price, tagsIds, imagesIds })
  }

  @Delete(DeleteProductUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async deleteProduct(@Param('productId') productId: string): Promise<DeleteProductResultHttpResponseDto> {
    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.patchProduct`,
      params: {
        productId,
      },
    })

    return await this.productsService.deleteProduct(productId)
  }
}
