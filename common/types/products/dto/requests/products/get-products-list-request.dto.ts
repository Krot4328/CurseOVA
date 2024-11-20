import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { GetProductsSearch } from '@boilerplate/types/products/interfaces/products'

export const GetProductsListUrl = '/products'

export class GetProductsSearchDto implements GetProductsSearch {
  [x: string]: string | readonly string[]

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  search?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  page?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  pageSize?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsUUID(4, { each: true })
  tagsIds?: string[]
}

export class GetProductsHttpServerRequestDto extends HttpServerRequestDto<
  typeof GetProductsListUrl,
  never,
  GetProductsSearchDto
> {
  readonly method = Method.Get

  readonly url = GetProductsListUrl

  @ValidateNested()
  @Type(() => GetProductsSearchDto)
  search?: GetProductsSearchDto
}

export class GetProductsHttpClientRequestDto extends HttpClientRequestDto<
  typeof GetProductsListUrl,
  never,
  GetProductsSearchDto
> {
  readonly method = Method.Get

  readonly url = GetProductsListUrl

  @ValidateNested()
  @Type(() => GetProductsSearchDto)
  search?: GetProductsSearchDto
}
