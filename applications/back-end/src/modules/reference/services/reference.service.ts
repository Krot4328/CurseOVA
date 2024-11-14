import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { HttpListServerResponse } from '@boilerplate/core/interfaces/http'

import { TagsMap } from '@boilerplate/types/reference/interfaces/tags'

import { TagGroupEntity } from '@boilerplate/back-end/modules/reference/entities/tag-group.entity'

import { ReferenceDataMapper } from '@boilerplate/back-end/modules/reference/data-mappers/reference.data-mapper'

@Injectable()
export class ReferenceService {
  @InjectRepository(TagGroupEntity)
  private readonly tagGroupEntity: Repository<TagGroupEntity>

  constructor(private readonly referenceDataMapper: ReferenceDataMapper) {}

  async getTagsMap(): Promise<HttpListServerResponse<TagsMap>> {
    const [tagGroups, total] = await this.tagGroupEntity.findAndCount({
      relations: {
        tags: true,
      },
    })

    return {
      result: tagGroups.map((tagGroup) => this.referenceDataMapper.toTagsMap(tagGroup)),
      total,
    }
  }
}
