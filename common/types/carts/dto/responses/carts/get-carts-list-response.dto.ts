import { Type } from 'class-transformer'
import { IsArray, IsOptional } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { GetCartDto } from '@boilerplate/types/carts/dto/responses/carts/get-cart-response.dto'

export class GetCartsHttpListResponseDto extends HttpListServerResponseDto<GetCartDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetCartDto)
  result?: GetCartDto[]
}
