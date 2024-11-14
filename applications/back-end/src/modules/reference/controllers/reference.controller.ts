import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GetReferenceTagsUrl } from '@boilerplate/types/reference/dto/requests/reference'
import { GetReferenceTagsHttpListResponseDto } from '@boilerplate/types/reference/dto/responses/reference'

import { ReferenceService } from '@boilerplate/back-end/modules/reference/services/reference.service'

@Controller()
@ApiTags('Reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get(GetReferenceTagsUrl)
  async getTagsMap(): Promise<GetReferenceTagsHttpListResponseDto> {
    return await this.referenceService.getTagsMap()
  }
}
