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

  constructor(private readonly productsService: ProductsService) {}

  @Get(GetProductsListUrl)
  async getProductsList(@Query() queries: GetProductsSearchDto): Promise<GetProductsHttpListResponseDto> {
    const { search, page, pageSize, tagsIds } = queries

    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.getProductsList`,
      queries: {
        search,
        page,
        pageSize,
        tagsIds,
      },
    })

    return await this.productsService.getProductsList({ search, page, pageSize, tagsIds })
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

    return null
  }

  @Post(PostProductUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async postProduct(@Body() body: PostProductDataDto): Promise<PostProductResultHttpResponseDto> {
    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.postProduct`,
      body,
    })

    return null
  }

  @Patch(PatchProductUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async patchProduct(
    @Param('productId') productId: string,
    @Body() body: PatchProductDataDto,
  ): Promise<PatchProductResultHttpResponseDto> {
    this.logger.log({
      controller: ProductsController.name,
      action: `${ProductsController.name}.patchProduct`,
      params: {
        productId,
      },
      body,
    })

    return null
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

    return null
  }
}
