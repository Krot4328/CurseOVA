import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchCartResult } from '@boilerplate/types/carts/interfaces/carts'

export class PatchCartResultDto implements PatchCartResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchCartResultHttpResponseDto extends HttpServerResponseDto<PatchCartResultDto> {
  @IsOptional()
  @Type(() => PatchCartResultDto)
  result?: PatchCartResultDto
}
