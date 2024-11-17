import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { ImageDto } from '@boilerplate/types/files/dto/generic/image.dto'
import { PriceDto } from '@boilerplate/types/products/dto/generic/price.dto'
import { GetProductShort } from '@boilerplate/types/products/interfaces/products'
import { ReferenceTagDto } from '@boilerplate/types/reference/dto/responses/reference/get-reference-tags-response.dto'

export class GetProductShortDto implements GetProductShort {
  @IsUUID(4)
  id: string

  @IsString()
  title: string

  @Type(() => PriceDto)
  price: PriceDto

  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[]

  @IsArray()
  @Type(() => ReferenceTagDto)
  tags: ReferenceTagDto[]
}

export class GetProductsHttpListResponseDto extends HttpListServerResponseDto<GetProductShortDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetProductShortDto)
  result?: GetProductShortDto[]
}
