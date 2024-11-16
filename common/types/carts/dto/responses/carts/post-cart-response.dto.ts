import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PostCartResult } from '@boilerplate/types/carts/interfaces/carts'

export class PostCartResultDto implements PostCartResult {
  @IsUUID(4)
  cartId: string

  @IsBoolean()
  isSuccess: boolean
}

export class PostCartResultHttpResponseDto extends HttpServerResponseDto<PostCartResultDto> {
  @IsOptional()
  @Type(() => PostCartResultDto)
  result?: PostCartResultDto
}
