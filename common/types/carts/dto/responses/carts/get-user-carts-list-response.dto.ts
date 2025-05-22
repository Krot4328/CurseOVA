import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { CartItemDto } from '@boilerplate/types/carts/dto/responses/carts/get-cart-response.dto'
import { GetCartInfo } from '@boilerplate/types/carts/interfaces/carts'

export class GetUserCartsListDto implements GetCartInfo {
  @ValidateNested()
  @IsArray()
  @Type(() => CartItemDto)
  items: CartItemDto[]

  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  profileId?: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  updatedAt?: string
}

export class GetUserCartsListHttpServerResponseDto extends HttpListServerResponseDto<GetUserCartsListDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetUserCartsListDto)
  result?: GetUserCartsListDto[]
}
