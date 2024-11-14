import { Injectable } from '@nestjs/common'

import { Tag, TagsMap } from '@boilerplate/types/reference/interfaces/tags'

import { TagGroupEntity } from '@boilerplate/back-end/modules/reference/entities/tag-group.entity'
import { TagEntity } from '@boilerplate/back-end/modules/reference/entities/tag.entity'

@Injectable()
export class ReferenceDataMapper {
  toTag(entity: TagEntity): Tag {
    const { id, name } = entity

    return {
      id,
      title: name,
    }
  }

  toTagsMap(entity: TagGroupEntity): TagsMap {
    const { id, name, tags } = entity

    return {
      id,
      title: name,
      tags: tags.map((tag) => this.toTag(tag)),
    }
  }
}
