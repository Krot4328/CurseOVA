import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsInt, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { CartItem, GetCart, StatusType } from '@boilerplate/types/carts/interfaces/carts'
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
  @IsUUID(4)
  id: string

  @IsUUID(4)
  profileId: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  phone: string

  @IsString()
  email: string

  @IsString()
  city: string

  @IsString()
  department: string

  @IsEnum(StatusType)
  paymentStatus: StatusType

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
