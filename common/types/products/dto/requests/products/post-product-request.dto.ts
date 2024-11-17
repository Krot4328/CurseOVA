import { Type } from 'class-transformer'
import { IsString, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

import { PriceDto } from '@boilerplate/types/products/dto/generic/price.dto'
import { type PostProductData } from '@boilerplate/types/products/interfaces/products'

export const PostProductUrl = '/products'

export class PostProductDataDto implements PostProductData {
  @HttpRequestFieldDecorator()
  @IsString()
  title: string

  @HttpRequestFieldDecorator()
  @IsString()
  description: string

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto

  @HttpRequestFieldDecorator()
  @IsString({ each: true })
  tagsIds: string[]

  @HttpRequestFieldDecorator()
  @IsString({ each: true })
  imagesIds: string[]
}

export class PostProductHttpServerRequestDto extends HttpServerRequestDto<typeof PostProductUrl, PostProductDataDto> {
  readonly method = Method.Post

  readonly url = PostProductUrl

  @ValidateNested()
  @Type(() => PostProductDataDto)
  readonly data: PostProductDataDto
}

export class PostProductHttpClientRequestDto extends HttpClientRequestDto<typeof PostProductUrl, PostProductDataDto> {
  readonly method = Method.Post

  readonly url = PostProductUrl

  @ValidateNested()
  @Type(() => PostProductDataDto)
  readonly data: PostProductDataDto
}
