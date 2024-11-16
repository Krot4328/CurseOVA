import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

import { PriceDto } from '@boilerplate/types/products/dto/generic/price.dto'
import { type PatchProductData } from '@boilerplate/types/products/interfaces/products'

export const PatchProductUrl = '/products/:productId'

export class PatchProductParamsDto implements Params<typeof PatchProductUrl> {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  productId: string
}

export class PatchProductDataDto implements PatchProductData {
  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  title?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  description?: string

  @ValidateNested()
  @Type(() => PriceDto)
  price?: PriceDto

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString({ each: true })
  imagesIds?: string[]

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString({ each: true })
  tagsIds?: string[]
}

export class PatchProductHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchProductUrl,
  PatchProductDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchProductUrl

  @ValidateNested()
  @Type(() => PatchProductDataDto)
  readonly data: PatchProductDataDto
}

export class PatchProductHttpClientRequestDto extends HttpClientRequestDto<typeof PatchProductUrl, FormData> {
  readonly method = Method.Patch

  readonly url = PatchProductUrl

  @ValidateNested()
  @Type(() => FormData)
  readonly data: FormData
}
