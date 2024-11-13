import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

export class GetProductDataDto {
  @IsString()
  id: string

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsString()
  description: string

  @IsString()
  pathToImage: string

  @IsString()
  tackle: string
}

export class GetProductsListHttpResponseDto extends HttpListServerResponseDto<GetProductDataDto> {
  @IsOptional()
  @IsArray()
  @Type(() => GetProductDataDto)
  result?: GetProductDataDto[]
}