import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { GetCartsSearch } from '@boilerplate/types/carts/interfaces/carts'

export const GetCartsListUrl = '/carts'

export class GetCartsSearchDto implements GetCartsSearch {
  [x: string]: string | readonly string[]

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  page?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  pageSize?: string
}

export class GetCartsHttpServerRequestDto extends HttpServerRequestDto<
  typeof GetCartsListUrl,
  never,
  GetCartsSearchDto
> {
  readonly method = Method.Get

  readonly url = GetCartsListUrl

  @ValidateNested()
  @Type(() => GetCartsSearchDto)
  search?: GetCartsSearchDto
}

export class GetCartsHttpClientRequestDto extends HttpClientRequestDto<
  typeof GetCartsListUrl,
  never,
  GetCartsSearchDto
> {
  readonly method = Method.Get

  readonly url = GetCartsListUrl

  @ValidateNested()
  @Type(() => GetCartsSearchDto)
  search?: GetCartsSearchDto
}
