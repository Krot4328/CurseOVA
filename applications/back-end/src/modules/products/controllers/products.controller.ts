import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import { GetProductDataDto, GetProductsListUrl, PostProductDataDto, PostProductUrl, DeleteProductUrl } from '@boilerplate/types/products/dto/requests/products'
import { PostProductHttpResponseDto, GetProductsListHttpResponseDto, DeleteProductResultHttpServerResponseDto } from '@boilerplate/types/products/dto/responses/products'

import { JwtPassportAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport.guard'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'
import { FileInterceptor } from '@nestjs/platform-express'
import multer from 'multer'
import { extname, resolve } from 'path'
import { v4 as uuid } from 'uuid'
import { JwtPassportLogoutAuthGuard } from 'src/modules/auth/guards/jwt-passport-logout-auth.guard'

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtPassportAuthGuard)
  @ApiBearerAuth()
  @Roles([Role.Admin])
  @Post(PostProductUrl)
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, resolve(process.cwd(), 'uploads', 'tackles'))
      },
      filename: function (req, file, cb) {
        cb(null, `${uuid()}${extname(file.originalname)}`)
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        tackle: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async postProduct(@Body() data: PostProductDataDto, @UploadedFile() file: Express.Multer.File): Promise<PostProductHttpResponseDto> {
    const { title, description, price, tackle } = data
    const { filename } = file

    return await this.productsService.postProduct({ title, description, price, tackle, file })
  }

  @Get(GetProductsListUrl)
  async getSearchProductList(@Query() queries: GetProductDataDto): Promise<GetProductsListHttpResponseDto> {
    const { id, title, description, price, tackle, pathToImage } = queries

    return await this.productsService.getProducts({ id, title, description, price, tackle, pathToImage })
  }

  @Delete(DeleteProductUrl)
  @UseGuards(JwtPassportLogoutAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'productId', type: String, description: 'ID of the product to delete' })
  async deleteProduct(
    @Param('productId') productId: string,
  ): Promise<DeleteProductResultHttpServerResponseDto> {

    return await this.productsService.deleteProduct(productId)
  }
}