import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { HttpListServerResponseDto } from '@boilerplate/core/dto/responses/http-list-server-response.dto'

import { Tag, TagGroup, TagsMap } from '@boilerplate/types/reference/interfaces/tags'

export class ReferenceTagDto implements Tag {
  @IsString()
  id: string

  @IsString()
  title: string
}

export class ReferenceTagGroupDto implements TagGroup {
  @IsString()
  id: string

  @IsString()
  title: string
}

export class ReferenceTagsMapDto extends ReferenceTagGroupDto implements TagsMap {
  @IsArray()
  @Type(() => ReferenceTagDto)
  tags: ReferenceTagDto[]
}

export class GetReferenceTagsHttpListResponseDto extends HttpListServerResponseDto<ReferenceTagDto> {
  @IsOptional()
  @IsArray()
  @Type(() => ReferenceTagDto)
  result?: ReferenceTagDto[]
}
