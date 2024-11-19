import { Type } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PatchCartUserDataResult } from '@boilerplate/types/carts/interfaces/carts'

export class PatchCartUserDataResultDto implements PatchCartUserDataResult {
  @IsBoolean()
  isSuccess: boolean
}

export class PatchCartUserDataHttpResponseDto extends HttpServerResponseDto<PatchCartUserDataResultDto> {
  @IsOptional()
  @Type(() => PatchCartUserDataResultDto)
  result?: PatchCartUserDataResultDto
}
