import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { HttpServerResponseDto } from '@boilerplate/core/dto/responses/http-server-response.dto'

import { PostFilePreloadResult } from '@boilerplate/types/files/interfaces/files'

export class PostFilePreloadResultDto implements PostFilePreloadResult {
  @IsString()
  id: string
}

export class PostFilePreloadHttpResponseDto extends HttpServerResponseDto<PostFilePreloadResultDto> {
  @IsOptional()
  @IsArray()
  @Type(() => PostFilePreloadResultDto)
  result?: PostFilePreloadResultDto
}
