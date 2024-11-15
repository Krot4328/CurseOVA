import { Type } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { GetProductShortDto } from '@boilerplate/types/products/dto/responses/products/get-products-list-response.dto'
import { GetProduct } from '@boilerplate/types/products/interfaces/products'

export class GetProductDto extends GetProductShortDto implements GetProduct {
  @IsString()
  description: string
}

export class GetProductHttpResponseDto extends HttpServerResponseDto<GetProductDto> {
  @IsOptional()
  @Type(() => GetProductDto)
  result?: GetProductDto
}
