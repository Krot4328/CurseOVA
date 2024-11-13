import { IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { Tackle } from '@boilerplate/types/products/interfaces/products'

export const GetProductsListUrl = '/products'

export class GetProductDataDto {
  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  id: string

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  title: string

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  description: string

  @HttpRequestFieldDecorator()
  @IsNumber()
  @IsOptional()
  price: number

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  tackle: Tackle

  @HttpRequestFieldDecorator()
  @IsString()
  @IsOptional()
  pathToImage: string
}

export class GetProductsHttpServerRequestDto extends HttpServerRequestDto<typeof GetProductsListUrl> {
  readonly method = Method.Get

  readonly url = GetProductsListUrl
}

export class GetProductsHttpClientRequestDto extends HttpClientRequestDto<typeof GetProductsListUrl> {
  readonly method = Method.Get

  readonly url = GetProductsListUrl
}