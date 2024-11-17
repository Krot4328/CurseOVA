import { Type } from 'class-transformer'
import { IsArray, IsInt, IsOptional, Min, ValidateNested } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { CartItem, GetCart } from '@boilerplate/types/carts/interfaces/carts'
import { GetProductShortDto } from '@boilerplate/types/products/dto/responses/products/get-products-list-response.dto'

export class CartItemDto implements CartItem {
  @ValidateNested()
  @Type(() => GetProductShortDto)
  product: GetProductShortDto

  @IsInt()
  @Min(1)
  quantity: number
}

export class GetCartDto implements GetCart {
  @ValidateNested()
  @IsArray()
  @Type(() => CartItemDto)
  items: CartItemDto[]
}

export class GetCartHttpResponseDto extends HttpServerResponseDto<GetCartDto> {
  @IsOptional()
  @Type(() => GetCartDto)
  result?: GetCartDto
}
